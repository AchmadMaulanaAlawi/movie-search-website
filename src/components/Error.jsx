export default function Error({ errorMsg, className }) {
  return (
    <div className={className}>
      <div className="text-zinc-100 text-lg">{errorMsg}</div>
      <div className="mt-2 text-zinc-400 text-sm">
        <p>Things you can do:</p>
        <ul className="list-disc ps-4">
          <li>
            <p>
              Check your internet connection and make sure you're connected.
            </p>
          </li>
          <li>
            <p>Try another input value.</p>
          </li>
          <li>
            <p>Reload the page to retry.</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
