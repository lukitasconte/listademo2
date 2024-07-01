body {
    font-family: Arial, sans-serif;
    background-color: #f0f8ff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
}


.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 50px;
}


h1 {
    text-align: center;
    font-size: 40px;
    color: #00008b;
    margin-bottom: 10px;
}

h2 {
    text-align: center;
    font-size: 25px;
    color: #00008b;
    margin-bottom: 20px;
}


.auth-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 800px;
}

.auth-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #00008b;
    border-radius: 10px;
    padding: 20px;
    margin: 40px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.auth-button {
    text-decoration: none;
    font-size: 40px;
    color: #00008b;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #ffffff;
    transition: background-color 0.3s, color 0.3s;
}

.auth-button:hover {
    background-color: #00008b;
    color: #ffffff;
}


.divider {
    width: 2px;
    height: 100px;
    background-color: #00008b;
    margin: 0 10px;
}


.form-container {
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    text-align: center;
}


label {
    display: block;
    margin-bottom: 5px;
    color: #00008b;
}


input, textarea {
    width: 90%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}


button {
    width: 96%;
    padding: 10px;
    background-color: #00008b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #4169e1;
}

#toggleFormButton {
    width: 100%;
    padding: 10px;
    background-color: #00008b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

#toggleFormButton:hover {
    background-color: #4169e1;
}


.white-box {
    background-color: #ffffff;
    border: 1px solid #ccc;
    padding: 40px;
    margin-top: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.task-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: inline-block;
    vertical-align: top;
}

.task-card.red { background-color: #ffcccc; }
.task-card.blue { background-color: #cce6ff; }
.task-card.yellow { background-color: #ffffcc; }
.task-card.purple { background-color: #e6ccff; }
.task-card.green { background-color: #ccffcc; }

.task-actions {
    display: flex;
    margin-right: 10px;
    cursor: pointer;
}

.task-card.done {
    background-color: #f2f2f2;
    opacity: 0.6;
    filter: grayscale(100%);
}


.footer {
    text-align: center;
    font-size: 15px;
    color: #00008b;
    position: absolute;
    bottom: 10px;
    width: 100%;
}

.footer span {
    padding: 0 5px;
}


#clock {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    text-align: center;
    padding: 10px;
    border-radius: 10px;
}

#time {
    font-size: 48px;
    color: #00008b;
    font-weight: 900;
    font-family: 'Roboto', sans-serif;
}

#date {
    font-size: 24px;
    color: #555;
    font-weight: 900;
    font-family: 'Roboto', sans-serif;
}

/* Tema oscuro */
.dark-theme {
    --background-color: #121212;
    --text-color: #e0e0e0;
    --primary-color: #3b007f;
    --secondary-color: #4d3dff;
    --border-color: #272727;
    --box-shadow-color: rgba(0, 0, 0, 0.5);
}

body.dark-theme {
    background-color: var(--background-color);
    color: var(--text-color);
}

.dark-theme h1,
.dark-theme h2,
.dark-theme .footer,
.dark-theme label,
.dark-theme #time {
    color: var(--text-color);
}

.dark-theme .auth-box,
.dark-theme .form-container,
.dark-theme .white-box,
.dark-theme #taskForm,
.dark-theme .task-card {
    background-color: var(--background-color);
}

.dark-theme .auth-button,
.dark-theme .task-button,
.dark-theme button,
.dark-theme #toggleFormButton,
.dark-theme #taskForm button {
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
}

.dark-theme .auth-button:hover,
.dark-theme .task-button:hover,
.dark-theme button:hover,
.dark-theme #toggleFormButton:hover,
.dark-theme #taskForm button:hover {
    background-color: var(--secondary-color);
    color: #ccc;
}

.dark-theme .home-link {
    position: absolute;
    text-decoration: none;
    top: 0px;
    left: 30px;
    font-size: 40px;
    color: #ffffff
}


.dark-theme .divider {
    background-color: var(--text-color);
}

.dark-theme .task-card.done {
    background-color: #1e1e1e;
    opacity: 0.7;
    filter: grayscale(100%);
}

.dark-theme .color-option.red { background-color: #ff6b6b; }
.dark-theme .color-option.blue { background-color: #5cacee; }
.dark-theme .color-option.yellow { background-color: #fff176; }
.dark-theme .color-option.purple { background-color: #c085f1; }
.dark-theme .color-option.green { background-color: #66bb6a; }

.theme-switcher {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.theme-switcher label {
    display: flex;
    align-items: center;
}

.theme-switcher input[type="checkbox"] {
    appearance: none;
    width: 40px;
    height: 20px;
    background-color: var(--border-color);
    border-radius: 10px;
    position: relative;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}


.theme-switcher input[type="checkbox"]:checked {
    background-color: var(--primary-color);
}

.theme-switcher input[type="checkbox"]::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: var(--text-color);
    border-radius: 50%;
    transition: transform 0.3s;
}

.theme-switcher input[type="checkbox"]:checked::before {
    transform: translateX(20px);
}
.theme-switcher input[type="checkbox"]:not(:checked)::before {
    background-color: #000;
}




.language-switcher {
    position: absolute;
    top: 60px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #00008b;
    font-size: 16px;
}

.language-switcher label {
    display: flex;
    align-items: center;
}

.language-switcher select {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #ffffff;
    font-size: 16px;
    cursor: pointer;
}


.theme-switcher {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-color);
    font-size: 16px;
    z-index: 100

.home-link {
    position: absolute;
    text-decoration: none;
    top: 0px;
    left: 30px;
    font-size: 40px;
    color: #00008b
}


