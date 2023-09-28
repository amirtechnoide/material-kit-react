import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextWysiwyg = ({ height, value, setValue }) => <ReactQuill for style={{ height: height ?? '70%' }} value={value} onChange={(value) => setValue(value)} />


export default TextWysiwyg;
