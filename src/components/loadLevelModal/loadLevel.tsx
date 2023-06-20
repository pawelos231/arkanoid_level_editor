import { useCallback, useEffect, useState } from "react";
import "./loadLevel.css";
import { bricksLoader } from "../../helpers/prepareLoadedBricks";
import { Brick } from "../../interfaces/Level";

type Props = {
  changeRowsCount: (rows: number) => void;
  changeColumnCount: (columns: number) => void;
  setBricks: (bricks: Brick[]) => void;
};

const LoadLevelModal = ({
  setBricks,
  changeRowsCount,
  changeColumnCount,
}: Props) => {
  const [file, setFile] = useState<File | null>();
  const [contents, setContents] = useState<string>();

  const readFile = useCallback(() => {
    if (!file) return;
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = (e) => {
      const contents = e.target?.result;
      setContents(contents as string);
    };
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    readFile();
  }, [file, readFile, contents]);
  if (contents) {
    const generated = bricksLoader(contents);
    if (generated) {
      const { bricks, rows, columns } = generated;
      setTimeout(() => {
        changeColumnCount(columns);
        changeRowsCount(rows);
        setBricks(bricks);
      }, 1);
    }
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Load Level</h2>
        <label htmlFor="file-upload" className="custom-file-upload">
          Select File
        </label>

        <input
          id="file-upload"
          type="file"
          accept=".txt"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default LoadLevelModal;
