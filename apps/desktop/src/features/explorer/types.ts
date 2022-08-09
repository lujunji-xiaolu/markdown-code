export interface File {
  path: string;
  fileName: string;
  content: string;
}

export interface Dir {
  path: string;
  fileName: string;
  dirs: Dir[];
  files: File[];
}
