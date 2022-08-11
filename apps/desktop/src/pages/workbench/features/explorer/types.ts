export interface File {
  path: string;
  fileName: string;
  components: string[];
}

export interface Dir {
  path: string;
  fileName: string;
  components: string[];
  dirs: Dir[];
  files: File[];
}
