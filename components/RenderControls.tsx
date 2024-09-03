import React from "react";
import { z } from "zod";
import { useRendering } from "../helpers/use-rendering";
import { CompositionProps, COMP_NAME } from "../types/constants";
import { AlignEnd } from "./AlignEnd";
import { Button } from "./Button";
import { InputContainer } from "./Container";
import { DownloadButton } from "./DownloadButton";
import { ErrorComp } from "./Error";
import { Input } from "./Input";
import { ProgressBar } from "./ProgressBar";
import { Spacing } from "./Spacing";

interface RenderControlsProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  video: string;
  setVideo: React.Dispatch<React.SetStateAction<string>>;

  inputProps: z.infer<typeof CompositionProps>;
}

export const RenderControls: React.FC<RenderControlsProps> = ({
  text,
  setText,
  image,
  setImage,
  video,
  setVideo,
  inputProps,
}) => {
  console.log("Text:", text);
  console.log("Image:", image);
  console.log("video:", video);
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps);

  return (
    <InputContainer>
      {state.status === "init" ||
      state.status === "invoking" ||
      state.status === "error" ? (
        <>
          <Input
            disabled={state.status === "invoking"}
            setText={setText}
            text={text}
           
          />
          <Input
            disabled={state.status === "invoking"}
            setText={setImage}
            text={image}
           
          />
          <Input
            disabled={state.status === "invoking"}
            setText={setVideo}
            text={video}
           
          />
          <Spacing />
          <AlignEnd>
            <Button
              disabled={state.status === "invoking"}
              loading={state.status === "invoking"}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </AlignEnd>
          {state.status === "error" ? (
            <ErrorComp message={state.error.message} />
          ) : null}
        </>
      ) : null}
      {state.status === "rendering" || state.status === "done" ? (
        <>
          <ProgressBar
            progress={state.status === "rendering" ? state.progress : 1}
          />
          <Spacing />
          <AlignEnd>
            <DownloadButton undo={undo} state={state} />
          </AlignEnd>
        </>
      ) : null}
    </InputContainer>
  );
};
