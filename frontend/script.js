

let choose_file=document.querySelector(".choose-file")

let URL="http://localhost:8000"
let UPLOAD_URL=`${URL}/file/upload`

let file_upload=document.querySelector("#file-upload")
let upload_shower=document.querySelector(".upload-shower")
let percentage=document.querySelector(".percentage")
let upload_text=document.querySelector(".upload-text")

choose_file.addEventListener("click",(e)=>{
    e.preventDefault()
    file_upload.click()
   
})

file_upload.addEventListener("change",(e)=>{
    e.preventDefault()
    upload_shower.style.display="block"
    upload(e)
    
})


const upload=(e)=>{
    e.preventDefault()
    const file=file_upload.files[0]
    let xhttp=new XMLHttpRequest()
    let formData=new FormData()
    formData.append("myfile",file)
    xhttp.onreadystatechange = function() {
        
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data=JSON.parse(xhttp.response)
            document.getElementById("url").value=data.file
        
        }
      };
    
      xhttp.upload.onprogress=updateProgress
    xhttp.open("POST",UPLOAD_URL)
    xhttp.send(formData)    

    
}

const updateProgress=(e)=>{
    let progress= Math.round ((e.loaded/e.total)*100)
    if(progress===100){
        upload_shower.style.display="none"
    }
    else{
        
        percentage.innerHTML=`${progress}%`
    }
}



let button=document.querySelector(".copy-btn")
button.addEventListener("click",()=>{
    let copyText=document.getElementById("url").value
    if(copyText!==""){

    
    navigator.clipboard.writeText(copyText).then(()=>{
        button.textContent="Copied to clipboard" 
    })
}

else{
    return
}
      
})