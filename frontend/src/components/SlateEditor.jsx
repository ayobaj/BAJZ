// import { useCallback, useMemo, useState } from 'react';
// import { createEditor } from 'slate';
// import { Slate, Editable, withReact } from 'slate-react';
// import { withHistory } from 'slate-history';
// import 'flowbite-react/dist/flowbite.css';

// const SlateEditor = () => {
//     const editor = useMemo(() => withHistory(withReact(createEditor())), []);
//     const [value, setValue] = useState([
//         {
//             type: 'paragraph',
//             children: [{ text: 'Write Something....' }],
//         },
//     ]);

//     const renderElement = useCallback(props => {
//         switch (props.element.type) {
//             case 'paragraph':
//             default:
//                 return <p {...props.attributes}>{props.children}</p>;
//         }
//     }, []);

//     return (
//         <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
//             <Editable renderElement={renderElement} placeholder="Write Something...." className='h-72 mb-12'/>
//         </Slate>
//     );
// };

// export default SlateEditor;
