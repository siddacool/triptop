export async function downloadFile(fileName: string, data: Blob | MediaSource) {
  try {
    const element = document.createElement('a');
    element.href = URL.createObjectURL(data);
    element.download = fileName;
    element.style.opacity = '0';
    document.body.appendChild(element);

    element.click();

    // Cleanup after the download is initiated
    URL.revokeObjectURL(element.href);
    document.body.removeChild(element);

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
}
