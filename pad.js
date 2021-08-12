/**
 * @author Fabian Braun <fabian.braun@haw-hamburg.de>
 */
import * as THREE from '/js/build/three.module.js';
import { OrbitControls } from '/js/examples/jsm/controls/OrbitControls.js';

let camera, grid, scene, renderer, sphere, currentColor = '0xffffff', texts = [], showEmotions = true;
let p = 0, a = 0, d = 0;
let farbsystem_element = document.getElementById("Farbsystem");
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

init();

function createRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight - (window.innerHeight / 6));
    document.body.appendChild(renderer.domElement);
}

function createScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
}

function createLight() {
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0.5, 1.0, 0.5).normalize();
    scene.add(light);
}

function createCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.x = 0
    camera.position.y = 5;
    camera.position.z = 37;
    scene.add(camera);
}

function addControls() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.update();
}

function createGrid() {
    grid = new THREE.GridHelper(20, 20, 0x000000, 0x555555);
    scene.add(grid);
}
/* Erstellt 12 separate Linien. Könnte man bestimmt eleganter lösen, funktioniert aber. */
function createSurroundingGrid() {
    
    const points = [];

    points.push(new THREE.Vector3(10, 10, 10));
    points.push(new THREE.Vector3(10, -10, 10));
    let lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    let line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(-10, 10, -10));
    points.push(new THREE.Vector3(10, 10, -10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(-10, 10, 10));
    points.push(new THREE.Vector3(10, 10, 10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(-10, 10, 10));
    points.push(new THREE.Vector3(-10, -10, 10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();
    
    points.push(new THREE.Vector3(-10, -10, 10));
    points.push(new THREE.Vector3(10, -10, 10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(10, -10, 10));
    points.push(new THREE.Vector3(10, -10, -10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(10, 10, -10));
    points.push(new THREE.Vector3(10, -10, -10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(10, 10, -10));
    points.push(new THREE.Vector3(10, 10, 10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(-10, 10, -10));
    points.push(new THREE.Vector3(-10, 10, 10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(-10, 10, -10));
    points.push(new THREE.Vector3(-10, -10, -10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(-10, -10, -10));
    points.push(new THREE.Vector3(-10, -10, 10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

    points.push(new THREE.Vector3(-10, -10, -10));
    points.push(new THREE.Vector3(10, -10, -10));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.pop();
    points.pop();

}

function createMiddleLine() {
    const points = [];
    // points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(0, -10, 0));

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
}

function addTexts() {
    const loader = new THREE.FontLoader();
    loader.load('js/examples/fonts/optimer_regular.typeface.json', function(font) {

        const textGeometryPlusD = new THREE.TextGeometry('+D', {
            font: font,
            size: .50,
            height: .50,
        });
        const textPlusD = new THREE.Mesh(textGeometryPlusD, lineMaterial);
        textPlusD.position.set(0, 0, 10)
        scene.add(textPlusD);

        const textGeometryMinusD = new THREE.TextGeometry('-D', {
            font: font,
            size: .50,
            height: .50,
        });
        const textMinusD = new THREE.Mesh(textGeometryMinusD, lineMaterial);
        textMinusD.position.set(0, 0, -11)
        scene.add(textMinusD);

        const textGeometryPlusA = new THREE.TextGeometry('+A', {
            font: font,
            size: .50,
            height: .50,
        });
        const textPlusA = new THREE.Mesh(textGeometryPlusA, lineMaterial);
        textPlusA.position.set(-11, 0, 0)
        scene.add(textPlusA);

        const textGeometryMinusA = new THREE.TextGeometry('-A', {
            font: font,
            size: .50,
            height: .50,
        });
        const textMinusA = new THREE.Mesh(textGeometryMinusA, lineMaterial);
        textMinusA.position.set(10, 0, 0)
        scene.add(textMinusA);

        const textGeometryMinusP = new THREE.TextGeometry('-P', {
            font: font,
            size: .50,
            height: .50,
        });
        const textMinusP = new THREE.Mesh(textGeometryMinusP, lineMaterial);
        textMinusP.position.set(0, -10.5, 0)
        scene.add(textMinusP);

        const textGeometryPlusP = new THREE.TextGeometry('+P', {
            font: font,
            size: .50,
            height: .50,
        });
        const textPlusP = new THREE.Mesh(textGeometryPlusP, lineMaterial);
        textPlusP.position.set(0, 10, 0)
        scene.add(textPlusP);


        const textGeometryHappy = new THREE.TextGeometry('Glücklich', {
            font: font,
            size: .50,
            height: .50,
        });
        const textHappy = new THREE.Mesh(textGeometryHappy, lineMaterial);
        textHappy.position.set(-10, 10, 10)
        textHappy.name = "textHappy";
        scene.add(textHappy);

        const textGeometryContent = new THREE.TextGeometry('Zufrieden', {
            font: font,
            size: .50,
            height: .50,
        });
        const textContent = new THREE.Mesh(textGeometryContent, lineMaterial);
        textContent.position.set(8, 10, 10)
        textContent.name = "textContent";
        scene.add(textContent);

        const textGeometryAngry = new THREE.TextGeometry('Wütend', {
            font: font,
            size: .50,
            height: .50,
        });
        const textAngry = new THREE.Mesh(textGeometryAngry, lineMaterial);
        textAngry.position.set(-10, -10, 10)
        textAngry.name = "textAngry";
        scene.add(textAngry);

        const textGeometryDespicable = new THREE.TextGeometry('Verächtlich', {
            font: font,
            size: .50,
            height: .50,
        });
        const textDespicable = new THREE.Mesh(textGeometryDespicable, lineMaterial);
        textDespicable.position.set(8, -10, 10)
        textDespicable.name = "textDespicable";
        scene.add(textDespicable);

        const textGeometrySurprised = new THREE.TextGeometry('Erstaunt', {
            font: font,
            size: .50,
            height: .50,
        });
        const textSurprised = new THREE.Mesh(textGeometrySurprised, lineMaterial);
        textSurprised.position.set(-10, 10, -10)
        textSurprised.name = "textSurprised";
        scene.add(textSurprised);

        const textGeometryCaredFor = new THREE.TextGeometry('Umsorgt', {
            font: font,
            size: .50,
            height: .50,
        });
        const textCaredFor = new THREE.Mesh(textGeometryCaredFor, lineMaterial);
        textCaredFor.position.set(8, 10, -10)
        textCaredFor.name = "textCaredFor";
        scene.add(textCaredFor);

        const textGeometrySuspicious = new THREE.TextGeometry('Misstrauisch', {
            font: font,
            size: .50,
            height: .50,
        });
        const textSuspicious = new THREE.Mesh(textGeometrySuspicious, lineMaterial);
        textSuspicious.position.set(-10, -10, -10)
        textSuspicious.name = "textSuspicious";
        scene.add(textSuspicious);

        const textGeometrySad = new THREE.TextGeometry('Traurig', {
            font: font,
            size: .50,
            height: .50,
        });
        const textSad = new THREE.Mesh(textGeometrySad, lineMaterial);
        textSad.position.set(8, -10, -10)
        textSad.name = "textSad";
        scene.add(textSad);

        
        texts.push(textPlusD, textMinusD, textPlusA, textMinusA, textPlusP, textMinusP);
        if (showEmotions) {
            texts.push(textHappy, textContent, textCaredFor, textDespicable, textAngry, textSad, textSurprised, textSuspicious);
        }
        
        render();

    });
}

function updateTexts() {
    texts.forEach(looky);

    function looky(item) {
        item.lookAt(camera.position);
    }
}

function addSphere() {
    const sphereGeometry = new THREE.SphereGeometry(2 / 3, 2 ** 4, 2 ** 4);
    const spehereMaterial = new THREE.MeshBasicMaterial({ color: currentColor });
    const newSphere = new THREE.Mesh(sphereGeometry, spehereMaterial);
    sphere = newSphere;
    sphere.position.set(-a * 10, p * 10, d * 10);
    scene.add(sphere);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();

}

function resetScene() {
    scene.clear();
    createLight();
    createCamera();
    addControls();
    addTexts();
    createGrid();
    createMiddleLine();
    createSurroundingGrid();
    render();
}

function render() {
    updateTexts();
    renderer.render(scene, camera);

}

function init() {
    createScene();
    createCamera();
    createLight();
    createRenderer();
    createGrid();
    createSurroundingGrid();
    createMiddleLine();
    addListener();
    addTexts();
    updateTexts();
    addControls();

    window.addEventListener('resize', onWindowResize);
    render();
}

function addListener() {

    document.getElementById("Farbsystem").addEventListener("change", function() { changeSelectText(); setPreview(); });
    document.getElementById("submit_button").addEventListener("click", function() { setValues(); });
    document.getElementById("values_reset_button").addEventListener("click", resetValues);
    document.getElementById("scene_reset_button").addEventListener("click", resetScene);
    document.getElementById("x_input").addEventListener("input", setPreview);
    document.getElementById("y_input").addEventListener("input", setPreview);
    document.getElementById("z_input").addEventListener("input", setPreview);
    document.getElementById("emotionSwitch").addEventListener("change", toggleEmotions);    

}
function toggleEmotions() {

    showEmotions = !showEmotions;

    if (showEmotions == true) {

        addTexts();

    } else if (showEmotions == false) {
        // textHappy, textContent, textCaredFor, textDespicable, textAngry, textSad, textSurprised, textSuspicious
        scene.remove(scene.getObjectByName("textHappy"));
        scene.remove(scene.getObjectByName("textContent"));
        scene.remove(scene.getObjectByName("textCaredFor"));
        scene.remove(scene.getObjectByName("textDespicable"));
        scene.remove(scene.getObjectByName("textAngry"));
        scene.remove(scene.getObjectByName("textSad"));
        scene.remove(scene.getObjectByName("textSurprised"));
        scene.remove(scene.getObjectByName("textSuspicious"));

        render();

    }
}
function resetValues() {
    document.getElementById("p_input").value = "";
    document.getElementById("a_input").value = "";
    document.getElementById("d_input").value = "";
    document.getElementById("x_input").value = "";
    document.getElementById("y_input").value = "";
    document.getElementById("z_input").value = "";

    document.getElementById("Farbsystem").style = "width:8em;background-color: 5c636a";
}
function setValues() {
    let selectedFarbsystem = farbsystem_element.options[farbsystem_element.selectedIndex].value;

    let x_element_value = document.getElementById("x_input").value;
    let y_element_value = document.getElementById("y_input").value;
    let z_element_value = document.getElementById("z_input").value;
    let p_element_value = document.getElementById("p_input").value;
    let a_element_value = document.getElementById("a_input").value;
    let d_element_value = document.getElementById("d_input").value;
    p = p_element_value
    a = a_element_value
    d = d_element_value;
    // console.log("PAD: " + p,a,d);
    let element_values = [x_element_value, y_element_value, z_element_value, p_element_value, a_element_value, d_element_value];
    let pad_values = [p_element_value, a_element_value, d_element_value];

    function checkValuesEmpty(elements) {
        let i;

        for (i = 0; i < elements.length; i++) {
            
            if (elements[i].length == 0) {

                alert("Fehlende Eingabe(n)!");                
                return false;

            }

        }

        return true;
    }

    function checkPadValues(pad) {
        let i;

        for (i = 0; i <= pad.length; i++) {

            if (parseFloat(pad[i]) < -1 || parseFloat(pad[i]) > 1 ) {

                alert("Falsche Eingabe (" + pad[i] + "): PAD-Werte müssen zwischen -1 und 1 liegen.");
                return false;

            }      

        }

        return true;

    }


    function checkValuesValid(values) {
        let i;

        if (selectedFarbsystem == "Cie-XYZ") {
            /* values enthält auch die PAD-Werte, die dann dummerweise doppelt gecheckt werden,
                deswegen muss hier die 3 hardgecodet werden. Nicht sonderlich elegant, läuft aber. */
            for (i = 0; i < 3; i++) { 

                if (parseFloat(values[i]) < -100.0 || parseFloat(values[i]) > 100.0) {

                    alert("Fehlerhafte Eingabe (" + values[i] + "): XYZ-Werte müssen zwischen -100 und 100 liegen.");
                    return false;

                };

            };

            return true;

        } else if (selectedFarbsystem == "Cie-Lab") {

            for (i = 0; i < 3; i++) {

                if (parseFloat(values[i]) < -128.0 || parseFloat(values[i]) > 128.0) {

                    alert("Fehlerhafte Eingabe (" + values[i] + "): L*a*b*-Werte müssen zwischen -128 und 128 liegen.");
                    return false;

                };

            };

            return true;

        } else if (selectedFarbsystem == "RGB") {

            for (i = 0; i < 3; i++) {

                if (parseFloat(values[i]) < 0 || parseFloat(values[i]) > 255) {

                    alert("Fehlerhafte Eingabe (" + values[i] + "): RGB-Werte müssen zwischen 0 und 255 liegen.");
                    return false;

                };

            };

            return true;

        } else if (selectedFarbsystem == "Cie-Luv") {
            // TODO
            return true;
        } else if (selectedFarbsystem == "Cie-Lch") {
            // TODO
            return true;
        };
    };


    if (checkValuesEmpty(element_values) &&
        checkPadValues(pad_values) &&
        checkValuesValid(element_values)) {

        if (selectedFarbsystem == "Cie-XYZ") {
            console.log("Modus: XYZ");

            // Umwandlung in Float, weil es sonst ein String wäre
            let x = parseFloat(x_element_value);
            let y = parseFloat(y_element_value);
            let z = parseFloat(z_element_value);

            let rgb = xyzToRgb([x, y, z]);
            let hex = rgbToHex(rgb);
            currentColor = hex;

            addSphere();
            render();

        } else if (selectedFarbsystem == "Cie-Lab") {
            console.log("Modus: L*a*b*");

            let L = parseFloat(x_element_value);
            let a = parseFloat(y_element_value);
            let b = parseFloat(z_element_value);

            currentColor = rgbToHex(xyzToRgb(labToXyz([L, a, b])));
            addSphere();
            render();

        } else if (selectedFarbsystem == "Cie-Lch") {
            console.log("Modus: LCh");
            let L = parseFloat(x_element_value);
            let c = parseFloat(y_element_value);
            let h = parseFloat(z_element_value);

            currentColor = rgbToHex(xyzToRgb(labToXyz(LchToLab([L, c, h]))));
            addSphere();
            render();
        } else if (selectedFarbsystem == "Cie-Luv") {
            //TODO
            console.log("Modus: L*u*v*");

            let L = parseFloat(x_element_value);
            let u = parseFloat(y_element_value);
            let v = parseFloat(z_element_value);

            currentColor = rgbToHex(xyzToRgb(LuvToXyz([L, u, v])));
            addSphere();
            render();

        } else if (selectedFarbsystem == "RGB") {
            console.log("Modus: RGB");

            let R = parseFloat(x_element_value);
            let G = parseFloat(y_element_value);
            let B = parseFloat(z_element_value);

            currentColor = rgbToHex([R, G, B]);
            addSphere();
            render();

        }

    };
}
/**
 * Ändert die HTML-Placeholder der Eingabefelder
 */
function changeSelectText() {

    if (document.getElementById("Farbsystem").value == "Cie-XYZ") {

        document.getElementById("x_input").placeholder = "X";
        document.getElementById("y_input").placeholder = "Y";
        document.getElementById("z_input").placeholder = "Z";

    } else if (document.getElementById("Farbsystem").value == "Cie-Lab") {

        document.getElementById("x_input").placeholder = "L*";
        document.getElementById("y_input").placeholder = "a*";
        document.getElementById("z_input").placeholder = "b*";

    } else if (document.getElementById("Farbsystem").value == "RGB") {

        document.getElementById("x_input").placeholder = "R";
        document.getElementById("y_input").placeholder = "G";
        document.getElementById("z_input").placeholder = "B";

    } else if (document.getElementById("Farbsystem").value == "Cie-Luv") {

        document.getElementById("x_input").placeholder = "L*";
        document.getElementById("y_input").placeholder = "u*";
        document.getElementById("z_input").placeholder = "v*";

    } else if (document.getElementById("Farbsystem").value == "Cie-Lch") {

        document.getElementById("x_input").placeholder = "L";
        document.getElementById("y_input").placeholder = "C";
        document.getElementById("z_input").placeholder = "H";

    };
}
/* Ändert die Farbvorschau */
function setPreview() {
    let selectedFarbsystem = farbsystem_element.options[farbsystem_element.selectedIndex].value;
    let previewButton = document.getElementById("Farbsystem");

    let x_element_value = document.getElementById("x_input").value;
    let y_element_value = document.getElementById("y_input").value;
    let z_element_value = document.getElementById("z_input").value;

    if (selectedFarbsystem == "Cie-XYZ") {
        console.log("Modus: XYZ");

        // Umwandlung in Float, weil es sonst ein String wäre
        let x = parseFloat(x_element_value);
        let y = parseFloat(y_element_value);
        let z = parseFloat(z_element_value);

        let rgb = xyzToRgb([x, y, z]);
        let hex = rgbToHex(rgb);

        previewButton.style = "width:8em;background-color: " + hex;

    } else if (selectedFarbsystem == "Cie-Lab") {
        console.log("Modus: L*a*b*");

        let L = parseFloat(x_element_value);
        let a = parseFloat(y_element_value);
        let b = parseFloat(z_element_value);

        previewButton.style = "width:8em;background-color: " + rgbToHex(xyzToRgb(labToXyz([L, a, b])));

    } else if (selectedFarbsystem == "Cie-Lch") {
        console.log("Modus: LCh");
        let L = parseFloat(x_element_value);
        let c = parseFloat(y_element_value);
        let h = parseFloat(z_element_value);

        previewButton.style = "width:8em;background-color: " + rgbToHex(xyzToRgb(labToXyz(LchToLab([L, c, h]))));

    } else if (selectedFarbsystem == "Cie-Luv") {
        //TODO
        console.log("Modus: L*u*v*");

        let L = parseFloat(x_element_value);
        let u = parseFloat(y_element_value);
        let v = parseFloat(z_element_value);

        previewButton.style = "width: 8em; background-color: " + rgbToHex(xyzToRgb(LuvToXyz([L, u, v])));

    } else if (selectedFarbsystem == "RGB") {
        console.log("Modus: RGB");

        let R = parseFloat(x_element_value);
        let G = parseFloat(y_element_value);
        let B = parseFloat(z_element_value);

        previewButton.style = "width:8em;background-color: " + rgbToHex([R, G, B]);

    }

    
}

/** https://en.wikipedia.org/wiki/SRGB#The_sRGB_transfer_function_.28.22gamma.22.29
 *  Umwandlung von XYZ nach RGB, skaliert mit 255
 */
function xyzToRgb(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;

    // https://wikimedia.org/api/rest_v1/media/math/render/svg/55840a61bb3e5b31469856346b5f66ce607fd9e3
    let R = 3.2406 * x - 1.5372 * y - 0.4986 * z;
    let G = -0.9689 * x + 1.8758 * y + 0.0415 * z;
    let B = 0.0557 * x - 0.204 * y + 1.057 * z;

    // https://wikimedia.org/api/rest_v1/media/math/render/svg/e1bbfd34a4c7dcf597660faea9f330d5494c429e
    function gamma(t) {
        return t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055;
    }

    R = gamma(R);
    G = gamma(G);
    B = gamma(B);

    return [R * 255, G * 255, B * 255];
}

function rgbToHex(rgb) {

    // Umwandlung in Int, weil es sonst ein String wäre
    let r = parseInt(rgb[0]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2]);

    console.log("RGB: " + r, g, b);

    // Ober- und Untergrenze
    if (r < 0) { r = 0 };
    if (r > 255) { r = 255 };
    if (g < 0) { g = 0 };
    if (g > 255) { g = 255 };
    if (b < 0) { b = 0 };
    if (b > 255) { b = 255 };

    console.log("RGB korrigiert: " + r, g, b);

    // Umwandlung in Hex
    function hexChar(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    let hex = '#' + hexChar(r) + hexChar(g) + hexChar(b);

    console.log("HEX: " + hex); // Kartoffelbrei!

    return hex;
}
// https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIELAB_to_CIEXYZ
function labToXyz(lab) {

    const L = lab[0];
    const a = lab[1];
    const b = lab[2];
    const Xn = 95.0489;
    const Yn = 100;
    const Zn = 108.884;
    const delta = 6 / 29;

    console.log("LAB: " + L, a, b);

    // https://wikimedia.org/api/rest_v1/media/math/render/svg/49031bc59dcca0df071e32843ba4579b7ce88374
    function fInv(t) {
        return (t > delta) ? Math.pow(t, 3) : 3 * Math.pow(delta, 2) * (t - (4 / 29));
    };

    // https://wikimedia.org/api/rest_v1/media/math/render/svg/7b8bec89d49f99c0ebae43df4e8f62093e3012cc
    const X = Xn * fInv(((L + 16) / 116) + (a / 500)) + 0;
    const Y = Yn * fInv((L + 16) / 116) + 0;
    const Z = Zn * fInv(((L + 16) / 116) - (b / 200)) + 0;

    console.log("XYZ: " + X, Y, Z);

    return [X, Y, Z];
}

function LuvToXyz(Luv) {
    const L = Luv[0];
    const u = Luv[1];
    const v = Luv[2];
    const Yn = 100;

    console.log("Luv: " + L, u, v);

    /* "For example, for the 2° observer and standard illuminant C, u′n = 0.2009, v′n = 0.4610."
    -- https://en.wikipedia.org/wiki/CIELUV#The_forward_transformation */
    const v_hyphen_n = 0.4610;
    const u_hyphen_n = 0.2009;

    // https://wikimedia.org/api/rest_v1/media/math/render/svg/5e341dbff4b5e424b13992dd449fca64a34950eb
    const u_hyphen = (u / (13 * L)) + u_hyphen_n;
    const v_hyphen = (v / (13 * L)) + v_hyphen_n;

    function calculateY() {
        return (L <= 8) ? Yn * L * Math.pow((3 / 29), 3) : Yn * Math.pow(((L + 16) / 116), 3);
    };

    const Y = calculateY();
    const X = Y * ((9 * u_hyphen) / (4 * v_hyphen));
    const Z = Y * ((12 - (3 * u_hyphen) - (20 * v_hyphen)) / (4 * v_hyphen));

    // console.log("XYZ in LUV(): " + Y,X,Z)

    return [X, Y, Z];
}

function LchToLab(Lch) {
    const L = Lch[0];
    const c = Lch[1];
    const h = Lch[2];

    console.log("LCH: " + L, c, h);

    const a = c * Math.cos(h / 180 * Math.PI);
    const b = c * Math.sin(h / 180 * Math.PI);

    return [L, a, b];
}