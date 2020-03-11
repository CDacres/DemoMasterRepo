export type ChildProps = {
  bindInputElement: (input: HTMLInputElement) => void;
  handleFileInputTrigger: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
