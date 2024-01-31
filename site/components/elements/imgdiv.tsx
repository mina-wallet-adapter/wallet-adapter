import css from "./style.module.css";

export function ImgDiv({ children, style = {} }) {
  return (
    <div className={css.imgdiv} style={{ ...style }}>
      {children}
    </div>
  );
}
