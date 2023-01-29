import { useMemo, useRef, useState } from "react";
import  ReactQuill  from  "react-quill";
import  "react-quill/dist/quill.snow.css";

const App = () => {
  const [value, setValue] = useState("");

  // Amazon S3に画像を保存する関数
  // const [saveImageToS3] = useSaveImageToS3Mutation({
  //   onCompleted: ({ saveImageToS3: { imageUrl } = {} }) => {
  //     // 画像が保存できたら、その保存先のURL(imageUrl)をinsertToEditor関数に渡す。
  //     insertToEditor(imageUrl);
  //   },
  // });

  const ref = useRef(null);

  const insertToEditor = (url) => {
    const range = ref.current.editor.getSelection();
    ref.current.editor.insertEmbed(range.index, "image", url);
  };

  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      // file type is only image.
      if (/^image\//.test(file.type)) {
        console.log(file);
      } else {
        alert("画像のみアップロードできます。");
      }
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        handlers: {
          image: selectLocalImage,
        },
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list:  "ordered" }, { list:  "bullet" }],
          ["link", "image",],
          [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
          ["clean"],
        ],
      },
    };
  }, []);

  console.log(value)

  return <ReactQuill modules={modules} ref={ref} onChange={setValue} />;
};

export default App;
