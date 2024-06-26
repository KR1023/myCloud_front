import folder from '../images/explorer/explorer_folder_2.png';
import document from '../svgs/explorer/edit_doc.svg';
import audioFile from '../svgs/explorer/audio_file.svg';
import videoFile from '../svgs/explorer/video_file.svg';
import pdf from '../svgs/explorer/pdf.svg';
import picture from '../svgs/explorer/picture.svg';
import apkFile from '../svgs/explorer/apk_file.svg';
import csvFile from '../svgs/explorer/csv_file.svg';
import pptFile from '../svgs/explorer/ppt_file.svg';
import def from '../svgs/explorer/file.svg';

export function returnFileIcon(file){
    const ext = file.ext;
    if(file.isDir){
        return folder;
    }else{
        if(ext === '.txt' || ext === '.doc' || ext === '.docx')
            return document;
        else if(ext === '.mp3' || ext === '.wav')
            return audioFile;
        else if(ext === '.pdf')
            return pdf;
        else if(ext === '.apk')
            return apkFile;
        else if(ext === '.csv')
            return csvFile;
        else if(ext === '.ppt' || ext === '.pptx')
            return pptFile;
        else if(ext === '.avi' || ext === '.mp4' || ext === '.wav')
            return videoFile;
        else if(ext === '.png' || ext === '.jpeg' || ext === '.jpg' || ext === '.gif')
            return picture;
        else
            return def;
    }
}