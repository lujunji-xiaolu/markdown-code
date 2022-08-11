export interface File {
  path: string;
  fileName: string;
}

export interface Dir {
  path: string;
  fileName: string;
  dirs: Dir[];
  files: File[];
}
