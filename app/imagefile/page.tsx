export default function ImageFile() {
  return (
    <>
      <label className="img-label">
        image:
        <input type="file" name="image" accept="image/*" />
      </label>
    </>
  );
}
