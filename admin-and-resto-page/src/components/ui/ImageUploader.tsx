import React, { useRef, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface ImageUploaderProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resetOnClear?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value = "",
  onChange,
  placeholder = "Paste image URL or upload",
  resetOnClear = false,
}) => {
  const [preview, setPreview] = useState<string>(value);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setPreview(ev.target.result as string);
          onChange(ev.target.result as string);
          setFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(e.target.value);
    onChange(e.target.value);
    setFileName("");
  };

  const handleClear = () => {
    setPreview("");
    onChange("");
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Input
        type="text"
        placeholder={placeholder}
        value={preview.startsWith("data:") ? "" : preview}
        onChange={handleUrlChange}
        style={{ marginBottom: 8 }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ flex: 1 }}
        />
        {preview && (
          <Button variant="outline" onClick={handleClear} type="button">
            Clear
          </Button>
        )}
      </div>
      {preview && (
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <img
            src={preview}
            alt={fileName || "preview"}
            style={{ maxWidth: 180, maxHeight: 180, borderRadius: 8, border: "1px solid #eee" }}
          />
          {fileName && <div style={{ fontSize: 12, color: "#888" }}>{fileName}</div>}
        </div>
      )}
    </div>
  );
};
