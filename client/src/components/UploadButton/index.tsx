import React, {useState} from 'react';
import {Button, Upload, UploadFile} from "antd";
import {CloudUploadOutlined} from "@ant-design/icons";
import styles from "@/styles/Home.module.scss"
import * as Api from "@/api";

const UploadButton = () => {

    const [fileList, setFileList] = useState<UploadFile[]>();

    const onUploadSuccess = async (options: any) => {
        try {
            const file = await Api.files.uploadFile(options);

            setFileList([])

            window.location.reload();

            console.log(file)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Upload
            customRequest={onUploadSuccess}
            fileList={fileList}
            onChange={ ( {fileList} ) => setFileList(fileList)}
            className={styles.upload}
        >
            <Button type={'primary'} icon={<CloudUploadOutlined />} size={'large'}>Load image</Button>
        </Upload>
    );
};

export default UploadButton;
