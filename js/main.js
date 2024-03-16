'use strict';

var MiCripto = null;
(() => {
    const keyChain = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];
    let initialized = false;
    let textareaInput;
    let textareaOutput;
    let noDataContainer;
    let withDataContainer;

    function windowSizeCheckOutput(){
        if(window.innerWidth < 768){
            textareaOutput.style.height = (textareaOutput.scrollHeight)+"px";
        }else{
            textareaOutput.style.height = '';
        }
    }
    function removeAccents(string){
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    function showResult(show){
        if(show){
            noDataContainer.classList.add("hidden");
            withDataContainer.classList.remove("hidden");
        }else{
            noDataContainer.classList.remove("hidden");
            withDataContainer.classList.add("hidden");
        }
    }
    function encodeString(string){
        for(let i = 0 ; i<keyChain.length ; i++){
            string = string.replaceAll(keyChain[i][0], keyChain[i][1]);
        }
        return string;
    }
    function decodeString(string){
        for(let i = 0 ; i<keyChain.length ; i++){
            string = string.replaceAll(keyChain[i][1], keyChain[i][0]);
        }
        return string;
    }
    function init(htmlTextIdInput, htmlTextIdOutput, htmlIdNoDataContainer, htmlIdWithDataContainer){
        if(typeof(htmlTextIdInput) == "string" && (textareaInput = document.getElementById(htmlTextIdInput)) != null){
            if(typeof(htmlTextIdOutput) == "string" && (textareaOutput = document.getElementById(htmlTextIdOutput)) != null){
                if(typeof(htmlIdNoDataContainer) == "string" && (noDataContainer = document.getElementById(htmlIdNoDataContainer)) != null){
                    if(typeof(htmlIdWithDataContainer) == "string" && (withDataContainer = document.getElementById(htmlIdWithDataContainer)) != null){
                        window.addEventListener('resize', windowSizeCheckOutput);
                        textareaOutput.addEventListener("change", windowSizeCheckOutput);
                        initialized = true;
                    }
                    else console.log("4. Verifique referencia al contenedor con datos");
                }
                else console.log("3. Verifique referencia al contenedor sin datos");
            }
            else console.log("2. Verifique referencia a la salida");
        }
        else console.log("1. Verifique referencia a la entrada de texto");
    }
    function encode(){
        if(initialized){
            textareaInput.value = removeAccents(textareaInput.value.toLowerCase());
            if(textareaInput.value.length != 0){
                textareaOutput.value = encodeString(textareaInput.value);
                textareaOutput.dispatchEvent(new Event('change'));
                showResult(true);
            }else{
                showResult(false);
            }
        }
    }
    function decode(){
        if(initialized){
            textareaInput.value = removeAccents(textareaInput.value.toLowerCase());
            if(textareaInput.value.length != 0){
                textareaOutput.value = decodeString(textareaInput.value);
                textareaOutput.dispatchEvent(new Event('change'));
                showResult(true);
            }else{
                showResult(false);
            }
        }
    }
    function copy(){
        if(initialized){
            navigator.clipboard.writeText(textareaOutput.value);
        }
    }
    MiCripto = {
        init: init,
        encode: encode,
        decode: decode,
        copy: copy
    };
})();
