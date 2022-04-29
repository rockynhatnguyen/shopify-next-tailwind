

export default function ProductOptions({ name, values, selectedOptions, setOptions }) {
  return (
    <fieldset className="mt-2">
        <legend className="text-xl font-semibold">{name}</legend>
        <div className="flex-wrap inline-flex items-center">
            {
                values.map(value => {
                    const id = `option-${name}-${value}`
                    const checked = selectedOptions[name] === value

                    return (
                        <label key={id} htmlFor={id}>
                            <input 
                                className="sr-only"
                                type="radio" 
                                id={id}
                                name={`option-${name}`}
                                value={value}
                                checked={checked}
                                onChange={() => setOptions(name, value)}
                            />
                            <div className={`p-2 mt-3 mr-3 text-lg rounded-full block cursor-pointer ${checked ? "text-white bg-gray-900" : "text-gray-900 bg-gray-200"}`}>
                                <span className="px-2">{value}</span>
                            </div>
                        </label>
                    )
                })
            }
        </div>
    </fieldset>
  )
}
