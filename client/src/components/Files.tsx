import React, {FC, useState} from 'react';
import {FileItem} from "@/api/dto/file.dto";
import FileActions from "@/components/FileActions";
import FileList, {FileSelectType} from "@/components/FileList"
import {Empty} from "antd";
import * as Api from "@/api";

interface FilesProps {
    items: FileItem[];
    withActions?: boolean;
}

const Files:FC<FilesProps> = ({ items, withActions }) => {
    const [files, setFiles] = useState(items || []);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const onFileSelect = (id: number, type: FileSelectType) => {
        if (type == "select") {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(itemId => itemId != id))
        }
    }

    const onClickRemove = () => {
        setSelectedIds([]);
        setFiles( prev => prev.filter( file => !selectedIds.includes(file.id) ) );
        Api.files.remove(selectedIds);
    }

    const onClickShare = () => {

    }

    return (
        <div>
            {
                files.length ?
                    <>
                        {withActions && <FileActions isActive={selectedIds.length > 0} onClickShare={onClickShare} onClickRemove={onClickRemove} />}
                        <FileList items={files} onFileSelect={onFileSelect} />
                    </>
                    :
                    <Empty className={'empty-block'} description={"No files found"} />
            }
        </div>
    );
};

export default Files;
