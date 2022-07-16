import React from "react";
import { CKEditor } from "ckeditor4-react";

const CKEditor_Index = ({ handleChange, value, values }) => {
  return (
    <div className="App">
      <CKEditor
        initData={value}
        data={values}
        onChange={handleChange}
        config={{
          embed_provider : '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
          youtube_disabled_fields :['txtEmbed', 'chkAutoplay'],
          extraPlugins:
            "embed,embedbase,uploadimage,image2,language,colorbutton,colordialog,font,autoembed,emoji,justify,uploadwidget,widget,lineutils,clipboard,notification,toolbar,button,filetools,notificationaggregator,filebrowser,popup,balloontoolbar,balloonpanel,dialog,dialogui",
          skin: "kama",
          startupFocus: true,

          filebrowserUploadUrl:
            process.env.REACT_APP_API_URL +
            "/offers/upload-offer-pic-description?type=Files&CKEditor=editor1&CKEditorFuncNum=1&langCode=en",

          fileTools_requestHeaders: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          toolbar: [
            {
              name: "document",
              groups: ["mode", "document", "doctools"],
              items: [
                "Source",
                "-",
                "Save",
                "NewPage",
                "ExportPdf",
                "Preview",
                "Print",
                "-",
                "Templates",
                "Language",
              ],
            },
            {
              name: "clipboard",
              groups: ["clipboard", "undo"],
              items: [
                "Cut",
                "Copy",
                "Paste",
                "PasteText",
                "PasteFromWord",
                "-",
                "Undo",
                "Redo",
              ],
            },
            {
              name: "editing",
              groups: ["find", "selection", "spellchecker"],
              items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"],
            },
            {
              name: "forms",
              items: [
                "Form",
                "Checkbox",
                "Radio",
                "TextField",
                "Textarea",
                "Select",
                "Button",
                "ImageButton",
                "HiddenField",
              ],
            },
            { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
            "/",
            {
              name: "basicstyles",
              groups: ["basicstyles", "cleanup"],
              items: [
                "Bold",
                "Italic",
                "Underline",
                "Strike",
                "Subscript",
                "Superscript",
                "-",
                "CopyFormatting",
                "RemoveFormat",
              ],
            },
            {
              name: "paragraph",
              groups: ["list", "indent", "blocks", "align", "bidi"],
              items: [
                "NumberedList",
                "BulletedList",
                "-",
                "Outdent",
                "Indent",
                "-",
                "Blockquote",
                "CreateDiv",
                "-",
                "JustifyLeft",
                "JustifyCenter",
                "JustifyRight",
                "JustifyBlock",
                "-",
                "BidiLtr",
                "BidiRtl",
                "Language",
              ],
            },
            { name: "links", items: ["Link", "Unlink", "Anchor"] },

            { name: "colors", items: ["TextColor", "BGColor"] },
            { name: "tools", items: ["Maximize", "ShowBlocks"] },
            { name: "others", items: ["-"] },
            { name: "about", items: ["About"] },
            {
              name: "insert",
              items: [
                "Widget",
                "EmojiPanel",
                "Table",
                "HorizontalRule",
                "SpecialChar",
                "PageBreak",
                "Iframe",
                "Lineutils",
                "FileTools",
                "Image",
                "EasyImageAlignLeft",
                "EasyImageAlignCenter",
                "EasyImageAlignRight",
                "filebrowser",
                "uploadImage",
                "Embed",
              ],
            },
            "/",
          ],
        }}
      />
    </div>
  );
};

export default CKEditor_Index;
