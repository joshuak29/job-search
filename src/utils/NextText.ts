const NextText = <T>(list: T[], val: T): T=> {
  const currentTextIndex = list.indexOf(val);
  const nextTextIndex = (currentTextIndex + 1) % list.length;
  const nextText = list[nextTextIndex];
  return nextText;
};
export default NextText;