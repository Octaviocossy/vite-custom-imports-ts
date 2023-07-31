import fs from 'fs';
import path from 'path';

interface IFolder_A_Path {
  [key: string]: string;
}

interface IFolder_R_Path {
  [key: string]: [string];
}

export const getFoldersName = (): string[] => {
  const folders = fs.readdirSync('./src', { withFileTypes: true });

  return folders
    .filter((folder) => folder.isDirectory())
    .map((folder) => `${folder.name}`);
};

export const getFoldersAbsolutePath = (): IFolder_A_Path => {
  const folders = getFoldersName();

  if (folders.length === 0) return {};

  const paths = folders.reduce((acc, folder) => {
    acc[`@${folder}`] = `${path.resolve(__dirname, `./src/${folder}`)}`;

    return acc;
  }, {} as IFolder_A_Path);

  return paths;
};

export const getFoldersRelativePath = (): IFolder_R_Path => {
  const folders = getFoldersName();

  if (folders.length === 0) return {};

  const paths = folders.reduce((acc, folder) => {
    acc[`@${folder}`] = [`./src/${folder}`];

    return acc;
  }, {} as IFolder_R_Path);

  return paths;
};

export const parseTsConfig = () => {
  try {
    const initTsConfig = JSON.parse(
      fs.readFileSync(`${path.resolve(__dirname, './tsconfig.json')}`, 'utf-8')
    );

    const folders = getFoldersRelativePath();

    const json = {
      ...initTsConfig,
      compilerOptions: {
        ...initTsConfig.compilerOptions,
        baseUrl: '.',
        paths: folders,
      },
    };

    fs.writeFileSync(
      `${path.resolve(__dirname, './tsconfig.json')}`,
      JSON.stringify(json, null, 2)
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
