import { join } from 'node:path'
import type { ExtensionContext } from 'vscode'
import { LanguageClient, TransportKind, type LanguageClientOptions, type ServerOptions } from 'vscode-languageclient/node'

let client: LanguageClient | undefined

export function activate(context: ExtensionContext) {
	const clientOptions: LanguageClientOptions = { documentSelector: ['typescript', 'typescriptreact'] }

	const serverModule = context.asAbsolutePath(join('dist', 'server.mjs'))
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: { module: serverModule, transport: TransportKind.ipc },
	}

	client = new LanguageClient('voicss-language-server', 'Voicss Language Server', serverOptions, clientOptions)
	void client.start()
}

export function deactivate() {
	return client?.stop()
}