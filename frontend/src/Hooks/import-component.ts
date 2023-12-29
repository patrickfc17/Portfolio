import { FailedToLoadComponentError } from '../Errors/FailedToLoadComponentError'
import { SerializationError } from '../Errors/SerializationError'
import { LoadComponentProcedure } from '../Types/components'

// TODO Type some kind of regexp path to this parameters
export const useComponent = async (
  path: string,
  scriptLoader: LoadComponentProcedure,
  root = 'index'
): Promise<void> => {
  const template = await fetch(`/${path}/${root}.html`)
    .then((res) => res.text())
    .catch(() => {
      throw new SerializationError()
    })

  try {
    renderTemplate(template, scriptLoader)
  } catch (e: unknown) {
    if (e instanceof FailedToLoadComponentError) {
      // TODO Fetch API endpoint to redirect to 500 Error Page
    }
  }
}

const renderTemplate = (
  template: string,
  scriptLoader: LoadComponentProcedure
): void => {
  const div = document.createElement('div')

  div.innerHTML = template
  document.body.appendChild(div)
  scriptLoader()
  document.body.removeChild(div)
}
