import axios from "@/core/axios"
import {FileItem} from "@/api/dto/file.dto";

type FileType = "all" | "photos" | "trash";

export const getAll = async (type: FileType = "all"): Promise<FileItem[]> => {
    const { data } = await axios.get('/files?type=' + type);

    return data
}

export const remove = async (ids: number[]): Promise<void> => {
    return await axios.delete('/files?ids=' + ids);
}

export const uploadFile = async (options: any) => {
    const {onSuccess, onError, file, onProgress} = options;

    const formData = new FormData();
    formData.append('file', file);

    const config = {
        headers: { "Content-type": "multipart/form-data" },
        onProgress: (event: ProgressEvent) => {
            onProgress({ percent: (event.loaded / event.total) * 100 });
        }
    }

    try {
        const { data } = await axios.post('files', formData, config);

        onSuccess();

        return data;

    } catch (e) {
        onError(e)
    }
}
