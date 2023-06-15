export default function getSharpen(quality: string) {
    let sharpen = '';
    if (typeof quality === 'string') {
      const matchResult = quality.match(/^[q|Q](\d{2})$/);
      const qualityNumber = matchResult && matchResult.length >= 2 ? parseInt(matchResult[1], 10) : 10000;
      if (qualityNumber <= 50) {
        sharpen = 's150';
      }
    }
    return sharpen;
  }
  