'use strict';

import './contentScript.css';

// chrome.storage.sync.remove("productionUrl");
if (document.getElementById('extension-container')) {
    document.getElementById('extension-container').remove();
} else {
    chrome.storage.sync.get("productionUrl", function(result) {
        if (typeof result.productionUrl !== 'undefined') {
           createAnswersFrame(result.productionUrl);
        } else {
            createInputFrame();
        }
    });

    // help functions
    function createAnswersFrame(prodUrl) {
        // create iframe
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', prodUrl);
        iframe.setAttribute('frameborder', '0');
        
        // create tools section
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('toolDiv');
        
        // buttons
        const closeBtn = document.createElement('button')
        closeBtn.classList.add('closeBtn');
        const closeImg = document.createElement('img');
        closeImg.classList.add('closeImg');
        closeImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/61/61155.png");
        const settingsBtn = document.createElement('button');
        settingsBtn.classList.add('settingsBtn');
        const settingsImg = document.createElement('img');
        settingsImg.classList.add('settingsImg');
        settingsImg.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ic_settings_48px.svg/1200px-Ic_settings_48px.svg.png");
        closeBtn.appendChild(closeImg);
        settingsBtn.appendChild(settingsImg);
        closeBtn.addEventListener("click", () => {
            document.getElementById('extension-container').remove();
        })
        settingsBtn.addEventListener("click", () => {
            createSettingsPage();
        })
        
        // add buttons to tool div
        toolDiv.appendChild(settingsBtn);
        toolDiv.appendChild(closeBtn);
        
        // iframe container
        const frameContainer = document.createElement('div');
        frameContainer.classList.add('frameContainer');
        frameContainer.appendChild(toolDiv);
        frameContainer.appendChild(iframe);
        
        //create overall container
        const container = document.createElement('div');
        container.setAttribute("id", "extension-container");
        
        //add iframe and tools section to container
        container.appendChild(frameContainer);
        
        // add container to html
        const html = document.querySelector('html');
        html.appendChild(container);
    }
    
    function createInputFrame() {
        // create different version of the same extension-container, to respect the ability to close it
        const formContainer = document.createElement('div');
        formContainer.setAttribute("id", "extension-container");
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title-div');
        const title = document.createElement('h1');
        title.classList.add("title");
        title.innerText = "Yext Search Extension";
        const titleLogo = document.createElement("img");
        titleLogo.classList.add("title-logo");
        titleLogo.setAttribute("src", "https://assets.themuse.com/uploaded/companies/894/small_logo.png?v=e9de47aaddb5aa347f8a6c013bfa55c1e8c09252fabedf2c147970f018235bbb");
        titleDiv.appendChild(title);
        titleDiv.appendChild(titleLogo);
        const form = document.createElement('form');
        form.setAttribute("id", "form");
        const formLabel = document.createElement('label');
        formLabel.setAttribute("for", "prodURL");
        formLabel.setAttribute("id", "settingsLabel")
        formLabel.innerHTML = "Enter your Answers Production URL:";
        const formInput = document.createElement('input');
        formInput.setAttribute("type", "text");
        formInput.setAttribute("id", "prodURL");
        formInput.setAttribute("name", "prodURL");
        formInput.setAttribute("placeholder", "Production URL")
        const formSubmit = document.createElement('input');
        formSubmit.setAttribute("type", "submit");
        formSubmit.setAttribute("id", "submit");
        formSubmit.setAttribute("value", "Submit");
        form.appendChild(formLabel);
        form.appendChild(formInput);
        form.appendChild(formSubmit);
        const introContainer = document.createElement('div');
        introContainer.classList.add('intro-container');
        introContainer.appendChild(titleDiv);
        introContainer.appendChild(form);
        formContainer.appendChild(introContainer);
        const html = document.querySelector('html');
        html.appendChild(formContainer);
    
        // put event listener on the form to run create Answers Frame function with the value they input if the value isn't blank, otherwise prompt for a non-blank value
        formSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            let currentIframe = formInput.value;
            chrome.storage.sync.set({
                productionUrl: currentIframe
            })
            document.getElementById('extension-container').remove();
            createAnswersFrame(currentIframe);
        })
    }

    function createSettingsPage() {
        document.getElementById('extension-container').remove();
        const formContainer = document.createElement('div');
        formContainer.setAttribute("id", "extension-container");
        const form = document.createElement('form');
        form.setAttribute("id", "form");
        const formLabel = document.createElement('label');
        formLabel.setAttribute("for", "prodURL");
        formLabel.setAttribute("id", "settingsLabel")
        formLabel.innerHTML = "Switch to a different Answers Experience by changing your Production URL:";
        const formInput = document.createElement('input');
        formInput.setAttribute("type", "text");
        formInput.setAttribute("id", "prodURL");
        formInput.setAttribute("name", "prodURL");
        formInput.setAttribute("placeholder", "New Production URL")
        const formSubmit = document.createElement('input');
        formSubmit.setAttribute("type", "submit");
        formSubmit.setAttribute("id", "submit");
        formSubmit.setAttribute("value", "Change URL");
        form.appendChild(formLabel);
        form.appendChild(formInput);
        form.appendChild(formSubmit);
        
        // create tools section
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('toolDiv');
        
        // buttons
        const closeBtn = document.createElement('button')
        closeBtn.classList.add('closeBtn');
        const closeImg = document.createElement('img');
        closeImg.classList.add('closeImg');
        closeImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/61/61155.png");
        const backBtn = document.createElement('button');
        backBtn.classList.add('backBtn');
        const backImg = document.createElement('img');
        backImg.classList.add('settingsImg');
        backImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/93/93634.png");
        closeBtn.appendChild(closeImg);
        backBtn.appendChild(backImg);
        closeBtn.addEventListener("click", () => {
            document.getElementById('extension-container').remove();
        })
        backBtn.addEventListener("click", () => {
            document.getElementById('extension-container').remove();
            chrome.storage.sync.get("productionUrl", function(result) {
                if (typeof result.productionUrl !== 'undefined') {
                   createAnswersFrame(result.productionUrl);
                }
            })
        })
        
        // add buttons to tool div
        toolDiv.appendChild(backBtn);
        toolDiv.appendChild(closeBtn);
        
        //yext logo
        const logoContainer = document.createElement('div');
        logoContainer.classList.add('logo-container');
        const logoImg = document.createElement('img');
        logoImg.classList.add('logo-img');
        logoImg.setAttribute("src", "https://assets.themuse.com/uploaded/companies/894/small_logo.png?v=e9de47aaddb5aa347f8a6c013bfa55c1e8c09252fabedf2c147970f018235bbb");
        const settingsTitle = document.createElement('h1');
        settingsTitle.classList.add('settings-title');
        settingsTitle.innerText = "Search Settings";
        logoContainer.appendChild(settingsTitle);
        logoContainer.appendChild(logoImg);

        const innerContainer = document.createElement('div');
        innerContainer.classList.add('inner-container');
        innerContainer.appendChild(toolDiv);
        innerContainer.appendChild(logoContainer);
        innerContainer.appendChild(form);

        formContainer.appendChild(innerContainer);

        const html = document.querySelector('html');
        html.appendChild(formContainer);

        // put event listener on the form to run create Answers Frame function with the value they input if the value isn't blank, otherwise prompt for a non-blank value
        formSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            let currentIframe = formInput.value;
            chrome.storage.sync.set({
                productionUrl: currentIframe
            })
            document.getElementById('extension-container').remove();
            createAnswersFrame(currentIframe);
        })
    }
}


