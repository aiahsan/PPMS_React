export interface RProps {
  title: string;
  children?: React.ReactChild | React.ReactChild[];
}

export interface Ifilter{
    orderByName: number,
    orderByDate: number,
    search: string,
    searchStack:string[],
  
}
export interface IModal {
  title: string;
  children?: React.ReactChild | React.ReactChild[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
