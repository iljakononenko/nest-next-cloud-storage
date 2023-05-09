import React, {FC} from 'react';
import {FileItem} from "@/api/dto/file.dto";
import styles from "./FileList.module.scss"
import FileCard from "@/components/FileCard";
import Selecto from "react-selecto";

export type FileSelectType = 'select' | 'unselect';

interface FileListProps {
    items: FileItem[];
    onFileSelect: (id: number, type: FileSelectType) => void;
}

const FileList: FC<FileListProps> = ({ items , onFileSelect}) => {
    return (
        <div className={styles.root}>
            {items.map(item =>
                <div data-id={item.id} key={item.id} className={"file"}>
                    <FileCard filename={item.filename} originalName={item.originalName} />
                </div>
            )}

            <Selecto
                container=".files"
                selectableTargets={[".file"]}
                selectByClick
                hitRate={10}
                selectFromInside
                toggleContinueSelect={["shift"]}
                continueSelect={false}
                onSelect={(e) => {
                    e.added.forEach((el) => {
                        el.classList.add("active");
                        onFileSelect(Number(el.dataset["id"]), "select");
                    });
                    e.removed.forEach((el) => {
                        el.classList.remove("active");
                        onFileSelect(Number(el.dataset["id"]), "unselect");
                    });
                }}
            />
        </div>
    );
};

export default FileList;
