
const bodyEle = document.getElementsByTagName('body')[0];
let flagElementForHighlight = false;
let currentActiveClass;

annotatorFun();

function annotatorFun(){
    const div = document.createElement('div');
    const button = document.createElement('button');
    const para = document.createElement('p');
    para.innerHTML = "Website Annotator";
    button.innerHTML = "Start";
    button.id = "annotator_start_btn";
    div.id = "annotator_div_cont";
    div.appendChild(para);
    div.appendChild(button);

    // div styling
    let annoStyle = div.style;
    annoStyle.display = "flex";
    annoStyle.padding = "0.45rem";
    annoStyle.justifyContent = "space-around";
    annoStyle.width = "200px";
    annoStyle.backgroundColor = "orange";
    annoStyle.fontFamily="Arial";
    annoStyle.position = "fixed";
    annoStyle.top="80%";
    annoStyle.left="80%";
    annoStyle.borderRadius="8px";

    //button style
    let butStyle = button.style;
    butStyle.padding= "0.5rem 1rem";
    butStyle.marginLeft = "0.3rem";
    butStyle.backgroundColor = "#0377fc";
    butStyle.border = "none";
    butStyle.borderRadius = "15px"
    butStyle.cursor = "pointer"
    butStyle.color = "white";
    
    bodyEle.appendChild(div);

    let togflag = true;
    document.getElementById('annotator_start_btn').addEventListener('click',()=>{
       
        if(togflag){
            const body = document.getElementsByTagName('body');
            let i = 0;
            Array.from(body.item(0).children).forEach(tag=>{
                tag.classList.add("annotator_class_"+i);
    
                if(tag.id !== "annotator_div_cont" && tag.id !== "comment_box_div_container"){
    
                    tag.setAttribute("data-ouline-status", "true");
                    
                    tag.setAttribute("onmouseenter", "annotatorActionPerformer(this)");
                    tag.setAttribute("onmouseleave", "annotatorActionPerformer(this)");
                    tag.setAttribute("onclick", "annotatorActionPerformerClicked(this)");
                    
                }
                i++;
            });
            document.getElementById('annotator_start_btn').innerHTML='Stop';
            document.getElementById('annotator_div_cont').style.opacity="0.5";
            togflag = false;
        }
        else{
            const body = document.getElementsByTagName('body');
            let i = 0;
            Array.from(body.item(0).children).forEach(tag=>{
                tag.classList.remove("annotator_class_"+i);
    
                if(tag.id !== "annotator_div_cont" && tag.id !== "comment_box_div_container"){
    
                    tag.removeAttribute("data-ouline-status");
                    
                    tag.removeAttribute("onmouseenter");
                    tag.removeAttribute("onmouseleave");
                    tag.removeAttribute("onclick");
                    
                }
                i++;
            });
            document.getElementById('annotator_start_btn').innerHTML='Start';
            document.getElementById('annotator_div_cont').style.opacity="1";
            togflag=true;
        }
    });


}


function annotatorActionPerformer(e) {
    const currentElement = e.classList[e.classList.length-1];
    const classElement = document.getElementsByClassName(currentElement)[0];
    const getclassAtt = classElement.getAttribute("data-ouline-status");
    
    if(getclassAtt === "true"){
        classElement.style.outline = "2px dashed black";
        classElement.setAttribute("data-ouline-status", "false");
    }
    else if(getclassAtt === "false"){
        classElement.style.outline = "none";
        classElement.setAttribute("data-ouline-status", "true");
    }
}


function annotatorActionPerformerClicked(e) {
    const currentElement = e.classList[e.classList.length-1];
    const classElement = document.getElementsByClassName(currentElement)[0];
    classElement.style.outline = "2px dashed red";

    classElement.removeAttribute('onmouseenter');
    classElement.removeAttribute('onmouseleave');

    let pos = caculatePosition(classElement);


    if(!document.getElementById('comment_box_div_container')){
        currentActiveClass = classElement.classList[classElement.classList.length-1];
        console.log(currentActiveClass);
        const newDivElement = document.createElement('div');
        newDivElement.id = "comment_box_div_container";
        newDivElement.style = `
        width:300px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        background-color: orange;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        padding: 0.5rem;
        align-items: center;
        justify-items: space-between;
        border-radius:16px;
        z-index:99999;
        `;
    
        newDivElement.innerHTML = `
        <p>Comment</p>
        <input id="commentor_name" style="margin: 0.5rem; padding: 0.5rem;border-radius:12px; width: 90%;" type="text" placeholder="Enter Name...">
        <input id="comment_input" style="margin: 0.5rem; padding: 0.5rem;border-radius:12px; width: 90%;" type="text" placeholder="Add Comment...">
        <div>
            <div>
                <button onclick="submitcomment('${currentElement.toString()}')" style="padding: 0.5rem 1rem;
                margin-left : 0.3rem;
                background-color : #0377fc;
                border : none;
                border-radius : 15px;
                cursor : pointer;color : white;">Comment</button>

                <button onclick="cancelCommentBox('${currentElement.toString()}')" style="padding: 0.5rem 1rem;
                margin-left : 0.3rem;
                background-color : #0377fc;
                border : none;
                border-radius : 15px;
                cursor : pointer;color : white;">Cancel</button>
            </div>
        </div>`;;
        
        bodyEle.appendChild(newDivElement);
    }
    else{
        const currentActiveClassDoc = document.getElementsByClassName(currentActiveClass)[0];
        currentActiveClassDoc.style.outline = "none";
        currentActiveClassDoc.setAttribute("data-ouline-status", "true");
        currentActiveClassDoc.setAttribute("onmouseenter", "annotatorActionPerformer(this)");
        currentActiveClassDoc.setAttribute("onmouseleave", "annotatorActionPerformer(this)");

        if(document.getElementById('comment_box_div_container')){
            document.getElementById('comment_box_div_container').remove();
        }

        currentActiveClass = classElement.classList[classElement.classList.length-1];
        const newDivElement = document.createElement('div');
        newDivElement.id = "comment_box_div_container";
        newDivElement.style = `
        width:300px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        background-color: orange;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        padding: 0.5rem;
        align-items: center;
        justify-items: space-between;
        border-radius:16px;
        `;
    
        newDivElement.innerHTML = `
        <p>Comment</p>
        <input id="commentor_name" style="margin: 0.5rem; padding: 0.5rem;border-radius:12px; width: 90%;" type="text" placeholder="Enter Name...">
        <input id="comment_input" style="margin: 0.5rem; padding: 0.5rem;border-radius:12px; width: 90%;" type="text" placeholder="Add Comment...">
        <div>
            <div>
                <button onclick="submitcomment('${currentElement.toString()}')" style="padding: 0.5rem 1rem;
                margin-left : 0.3rem;
                background-color : #0377fc;
                border : none;
                border-radius : 15px;
                cursor : pointer;color : white;">Comment</button>

                <button onclick="cancelCommentBox('${currentElement.toString()}')" style="padding: 0.5rem 1rem;
                margin-left : 0.3rem;
                background-color : #0377fc;
                border : none;
                border-radius : 15px;
                cursor : pointer;color : white;">Cancel</button>
            </div>
        </div>`;
        
        bodyEle.appendChild(newDivElement);

        
    }
}

function caculatePosition(classElement){
    var xScroll = classElement.scrollLeft || document.documentElement.scrollLeft;
    var yScroll = classElement.scrollTop || document.documentElement.scrollTop;
    var xPos=0, yPos=0;
    xPos += (classElement.offsetLeft - xScroll + classElement.clientLeft);
    yPos += (classElement.offsetTop - yScroll + classElement.clientTop);
    console.log(xPos, yPos);
    return {
        xPos:xPos,
        yPos:yPos
    }
}

// cancelCommentBox
function cancelCommentBox(classElement){
    document.getElementsByClassName(classElement)[0].style.outline = "none";
    document.getElementsByClassName(classElement)[0].setAttribute("data-ouline-status", "true");
    document.getElementsByClassName(classElement)[0].setAttribute("onmouseenter", "annotatorActionPerformer(this)");
    document.getElementsByClassName(classElement)[0].setAttribute("onmouseleave", "annotatorActionPerformer(this)");
    document.getElementById('comment_box_div_container').remove();
}

// submitcomment
let commentsMade = [];
function submitcomment(classElement){
    const className = document.getElementsByClassName(classElement)[0];
    const input_comment = document.getElementById('comment_input');
    const commentor_name = document.getElementById('commentor_name');
    if(input_comment.value === ''){
        alert('Enter comment');
        return;
    }
    if(commentor_name.value === ''){
        alert('Enter name');
        return;
    }
    
    let commentForTag = {
        className:className,
        commentMade:input_comment.value,
        commentor_name:commentor_name.value
    }
    commentsMade.push(commentForTag);
    console.log(commentsMade);
    
    if(document.getElementById('comments_Made')){
        className.removeChild(className.lastElementChild);
    }
    const newDiv = document.createElement('div');
    newDiv.style.textAlign="right";
    newDiv.style.margin="1rem";

    const select = document.createElement('select');
    select.style.padding="0.5rem";
    newDiv.id = "comments_Made";
    commentsMade.forEach(ele=>{
        if(ele.className === className){
            let options = document.createElement('option');
            options.style.padding="0.5rem";
            options.innerHTML = `${ele.commentor_name} commented ${ele.commentMade}`;
            select.appendChild(options);
        }
    });
    newDiv.appendChild(select);
    className.appendChild(newDiv);
}