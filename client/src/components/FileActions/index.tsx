import React, {FC} from 'react';
import styles from "./FileActions.module.scss"
import {Button, Popconfirm} from "antd";

interface FileActionsProps {
    onClickRemove: VoidFunction;
    onClickShare: VoidFunction;
    isActive: boolean;
}

const FileActions: FC<FileActionsProps> = ({ isActive, onClickRemove, onClickShare }) => {
    return (
        <div className={styles.root}>
            <Button onClick={onClickShare} disabled={!isActive}>
                Share
            </Button>

            <Popconfirm
                title={'Are you sure you want to remove these files?'}
                description={'All files will be moved to trash'}
                okText={"Yes"}
                cancelText={"No"}
                disabled={!isActive}
                onConfirm={onClickRemove}
            >
                <Button disabled={!isActive} type={'primary'} danger>
                    Remove
                </Button>
            </Popconfirm>
        </div>
    );
};

export default FileActions;
