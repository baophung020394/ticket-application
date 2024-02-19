import { User } from '@acme/shared-models';

interface AlphabetColors {
  [key: string]: string;
}

export const getNameColor = (name: string) => {
  const alphabetColors: AlphabetColors = {
    a: '#ff0000',
    b: '#ff4000',
    c: '#ff8000',
    d: '#ffbf00',
    e: '#ffff00',
    f: '#bfff00',
    g: '#80ff00',
    h: '#40ff00',
    i: '#00ff00',
    j: '#00ff40',
    k: '#00ff80',
    l: '#00ffbf',
    m: '#00ffff',
    n: '#00bfff',
    o: '#0080ff',
    p: '#0040ff',
    q: '#0000ff',
    r: '#4000ff',
    s: '#8000ff',
    t: '#bf00ff',
    u: '#ff00ff',
    v: '#ff00bf',
    w: '#ff0080',
    x: '#ff0040',
    y: '#ff0000',
    z: '#ff4000',
  };

  const firstLetter = name.charAt(0).toLowerCase();
  const color = alphabetColors[firstLetter] || '#000000'; // Mặc định là đen cho các ký tự không tương ứng

  return { name: firstLetter.toUpperCase(), color };
};

export const convertArrayToRecord = (arr: User[]): Record<number, string> => {
  return arr.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {} as Record<number, string>);
};
