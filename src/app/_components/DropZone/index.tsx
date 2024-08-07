import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";
import { FieldError } from "react-hook-form";

interface DropZoneProps {
  accept: Accept;
  label?: string;
  maxFiles?: number;
  error?: FieldError;
  setValue: (name: string, value: File[] | string) => void;
  clearErrors: (name?: string) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
  accept,
  label = "Drop image here",
  maxFiles = 5,
  error: mainImageError,
  setValue,
  clearErrors,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: (acceptedFiles: File[]) => {
      setError(null);
      clearErrors("images"); // clear form error on successful drop
      console.log(acceptedFiles);

      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`Only ${maxFiles} images are allowed`);
        const validFiles = acceptedFiles.slice(0, maxFiles - files.length);
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...validFiles];
          if (mainImage === null && updatedFiles.length > 0) {
            setMainImage(updatedFiles[0].name);
          }
          setValue("images", updatedFiles);
          setValue("mainImage", updatedFiles[0]?.name);
          return updatedFiles;
        });
      } else {
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...acceptedFiles];
          if (mainImage === null && updatedFiles.length > 0) {
            setMainImage(updatedFiles[0].name);
          }
          setValue("images", updatedFiles);
          setValue("mainImage", updatedFiles[0]?.name);
          return updatedFiles;
        });
      }
    },
  });

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.name !== fileName);
      setValue("images", updatedFiles);
      if (mainImage === fileName) {
        const newMainImage =
          updatedFiles.length > 0 ? updatedFiles[0].name : null;
        setMainImage(newMainImage);
        setValue("mainImage", newMainImage!);
      }
      return updatedFiles;
    });
  };

  const handleMainImageChange = (fileName: string) => {
    setMainImage(fileName);
    setValue("mainImage", fileName);
  };

  const thumbs = files.map((file) => (
    <label key={file.name}>
      <input
        type="radio"
        name="main-image"
        value={file.name}
        checked={mainImage === file.name}
        onChange={() => handleMainImageChange(file.name)}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          display: "inline-flex",
          position: "relative",
          borderRadius: 1,
          border:
            mainImage === file.name ? "2px solid blue" : "1px solid #eaeaea",
          marginBottom: 2,
          marginRight: 2,
          width: 100,
          height: 100,
          padding: 1,
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            removeFile(file.name);
          }}
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            minWidth: 0,
            overflow: "hidden",
            flexDirection: "column",
          }}
        >
          <Image
            width={100}
            height={100}
            layout="responsive"
            src={URL.createObjectURL(file)}
            alt="preview"
            onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
          />
        </Box>
      </Box>
    </label>
  ));

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [files]);

  return (
    <Box sx={{ borderColor: error || mainImageError?.message  ? "red" : "transparent" }}>
      <Box {...getRootProps()}>
        <Typography variant="h5">{label}</Typography>
        <input {...getInputProps({ className: "dropzone" })} />
        <Typography variant="body2">
          o haz click para seleccionar las imágenes
        </Typography>
      </Box>
      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 2,
        }}
      >
        {thumbs}
      </Box>
    </Box>
  );
};
