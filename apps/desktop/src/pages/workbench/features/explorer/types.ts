export interface File {
  id: number;
  path: string;
  fileName: string;
  components: string[];
}

export interface Dir {
  id: number;
  path: string;
  fileName: string;
  components: string[];
  dirs: Dir[];
  files: File[];
}
