import React, { cloneElement, useState } from "react"

const jsonToFormData = (json) => {
  try {
    const data = new FormData()

    for (let k in json) {
      data.append(k, json[k])
    }

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

const ErrorMessage = () => {
  return (
    <div style={{ color: "red" }}>
      <strong>url</strong> or <strong>siteUrl</strong> and{" "}
      <strong>formId</strong> are mandatory attributes
    </div>
  )
}

const Cf7FormWrapper = ({ children, url }) => {
  const [isSent, setSent] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(null)

  const apiUrl = url;

  const formSubmitHandler = (event, payload) => {
    event.preventDefault()

    setLoading(true)
    setError(null)

    fetch(apiUrl, {
      method: "POST",
      body: jsonToFormData(payload),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.status !== "mail_sent") throw resp.message
        setSent(true)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const Form = cloneElement(children, {
    handler: formSubmitHandler,
    isLoading,
    isSent,
    hasError,
  })

  return <div>{url ? Form : <ErrorMessage />}</div>
}

export default Cf7FormWrapper