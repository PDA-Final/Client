import React, { useCallback, useEffect, useRef, SetStateAction } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./BoardEditorTool";
import EditorJS, { OutputData } from "@editorjs/editorjs";

type BoardEditorProps = {
  /**
   * OutputData
   * blocks: [],
   * time: Number,
   * version: String
   */
  setData: React.Dispatch<SetStateAction<OutputData | undefined>>;
  data: OutputData | undefined;
  setTitle: React.Dispatch<SetStateAction<string>>;
  title: string;
};

const BoardModifier: React.FC<BoardEditorProps> = ({
  setData,
  data,
  setTitle,
  title,
}) => {
  const ReactEditorJS = createReactEditorJS();
  const editorCore = useRef<EditorJS | null>(null);

  const handleEditorInit = useCallback((instance: any) => {
    editorCore.current = instance;
    console.log(instance);
  }, []);

  const handleEditorChange = useCallback(async () => {
    if (editorCore.current) {
      const savedData: OutputData = await editorCore.current.save();
      setData(savedData);
    }
  }, []);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  // console.log(data);
  return (
    <div>
      <input
        type="text"
        className=" mt-[1vh] text-[1.55rem] text-C333333 font-medium"
        style={{ borderWidth: "0 0 1px", width: "100%" }}
        placeholder={"제목을 입력해 주세요"}
        onChange={handleTitleChange}
        autoFocus
        defaultValue={title ? title : ""}
      ></input>

      {
        data &&
        <ReactEditorJS
          defaultValue={data}
          onInitialize={handleEditorInit}
          tools={EDITOR_JS_TOOLS}
          onChange={handleEditorChange}
        />
      }
    </div>
  );
};

export default BoardModifier;
