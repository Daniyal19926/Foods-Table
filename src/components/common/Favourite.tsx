interface Props {
  isFavoured: boolean;
  onFavor(): void;
}

function Favourite({ isFavoured, onFavor }: Props) {
  let classes = "clickable fa-star fa-";
  classes += isFavoured ? "solid" : "regular";
  return <i className={classes} onClick={onFavor} />;
}
export default Favourite;
