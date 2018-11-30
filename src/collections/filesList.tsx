import * as React from "react";
import { File } from "src/models/file";

type FileOrPromise = File | Promise<File>;

interface Props {
  files: FileOrPromise[];
}

interface State {
  files: Array<File | undefined>;
  awaiting: Array<Promise<void> | undefined>;
}

const isFile = (file: object): file is File => {
  return file instanceof File;
};

const isPromise = (file: object): file is Promise<File> => {
  return file instanceof Promise;
};

const isFulfilled = (all: any[]): all is File[] => {
  return all.every(isFile);
};

export class FileList extends React.Component<Props, State> {
  public state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      awaiting: new Array(props.files.length).fill(undefined),
      files: new Array(props.files.length).fill(undefined)
    };

    let files = props.files;
    if (!isFulfilled(files)) {
      files = files.map((file, i) => {
        if (isPromise(file)) {
          const p = file.then(f => {
            const newFiles = this.state.files.slice(0);
            newFiles[i] = f;
            const pl = this.state.awaiting.slice(0);
            pl[i] = undefined;
            this.setState({ files: newFiles });
          });
          this.state.awaiting[i] = p;
        } else {
          this.state.files[i] = file as File;
        }

        return file;
      });
    } else {
      this.state.files = files;
    }
    console.log(this.state.files);
  }

  public render() {
    return (
      <ul>
        {this.state.files.map((t, i) => (
          <li key={i}>{t ? t.url : "loading"}</li>
        ))}
      </ul>
    );
  }
}
