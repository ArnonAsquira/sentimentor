let button = document.querySelector(".input-field>button");
let cat = document.getElementById('cat');
// event handler for button
  function getInput(e){
    let input = document.getElementById("text-area-1").value;
    let resultDiv = document.getElementById("result-div");
    async function fetchFunc(myText){
        loadingStatus  = "loading..."
        resultDiv.innerText = "";
        resultDiv.append(loadingStatus);
        let output =  await fetch("https://sentim-api.herokuapp.com/api/v1/" ,{
            method: "POST",
            headers :{
                Accept: "application/json", "Content-Type": "application/json"
            },
            body : JSON.stringify({ "text":`${myText}` })
        });
        cat.src = `https://http.cat/${output.status}`;
        if(output.status > 400){
            resultDiv.innerText = "";
            resultDiv.append("Error: invalid request");
        }else{
        output = await output.json(); 
        output = {
            type: output.result.type,
            polarity: output.result.polarity
        };
        
        let br = document.createElement('br');
        resultDiv.innerText = "";
        resultDiv.innerText = "";
         for(let property in output){
            resultDiv.append(br);
             resultDiv.append(property + ":" + output[property] + " ")
             if(property === "polarity" && Number(output["polarity"]) < 0){
                 resultDiv.style.color = 'red'
             }else if(property === "polarity" && Number(output["polarity"]) === 0){
                resultDiv.style.color = 'grey'
             }else{
                resultDiv.style.color = 'green'
             }
            }
         }
        }
    fetchFunc(input);
};
button.addEventListener('click', getInput); 
 


