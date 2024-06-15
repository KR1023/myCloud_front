export default function returnFileSize(size){
    let numberSize = parseInt(size);
    let resultSize = 0;

    if(size < 1024){
        resultSize = numberSize.toString() + 'B';
        
    }else if(size >= 1024){
        resultSize = (numberSize / 1024).toFixed(2);
        if(resultSize >= 1024){
            resultSize = (resultSize / 1024).toFixed(2);
            if(resultSize >= 1024){
                resultSize = (resultSize / 1024).toFixed(2);
                if(resultSize >= 1024){
                    resultSize = (resultSize / 1024).toFixed(2);
                    if(resultSize >= 1024){
                        resultSize = '1024TB 이상';
                    }else{
                        resultSize = resultSize + 'TB'
                    }
                }else{
                    resultSize = resultSize + 'GB';
                }
            }else{
                resultSize = resultSize + 'MB';
            }
        }else{
            resultSize = resultSize + 'KB';
        }
    }

    return resultSize;
}