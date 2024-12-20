'use client';
import classes from './image-picker.module.css'
import {useRef, useState} from 'react';
import Image from 'next/image';

export default function ImagePicker({label, name }) {

    const [pickedImage, setPickedImage] = useState()

    const imageInput = useRef();

function handleClick() {
    imageInput.current.click();
}

function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
        setPickedImage(null);
    } 
    const fileReader = new FileReader()

    fileReader.onload = () => {
        setPickedImage(fileReader.result)
    }

    fileReader.readAsDataURL(file);
}


    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                {!pickedImage && <p>No image selected</p>}
                {pickedImage && <Image src={pickedImage} alt="Image selected by user" fill />}
                </div>
                <input className={classes.input}
                type="file"
                id={name}
                accept="image/png, image/jpeg"
                name={name} 
                ref={imageInput}
                onChange={handleImageChange}
                required
                />
                <button onClick={handleClick} className={classes.button} type="button">
                    Pick an Image
                </button>
            </div>
        </div>
    )
}