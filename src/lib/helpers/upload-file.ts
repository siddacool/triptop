export async function readFileAsync(files: FileList | undefined): Promise<string | null> {
  return new Promise<string | null>((resolve, reject) => {
    if (!files) {
      resolve(null);

      return;
    }

    if (files.length < 1) {
      resolve(null);

      return;
    }

    const file = files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContents = event.target?.result as string;
      resolve(fileContents);
    };

    reader.onerror = () => {
      reject(new Error('An error occurred while reading the file.'));
    };

    reader.readAsText(file);
  });
}
