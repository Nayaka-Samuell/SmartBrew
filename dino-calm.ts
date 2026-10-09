/**
 * Dino Calm Extension
 * 
 * Provides a `/calm` command that replaces the standard Pi working indicator
 * with a calm, moving Dinosaur (🦖) roaming across your terminal.
 */

import type { ExtensionAPI, ExtensionContext, WorkingIndicatorOptions } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
	let isCalm = false;

	// Bikin frame animasi dinosaurus berjalan bolak-balik
	const width = 20;
	const frames: string[] = [];
	
	// Dino jalan ke kanan
	for (let i = 0; i < width; i++) {
		const space = " ".repeat(i);
		const tail = " ".repeat(width - i - 1);
		frames.push(`\x1b[38;5;46m[CALM] ${space}🦖${tail}\x1b[39m`);
	}
	// Dino jalan ke kiri (mundur)
	for (let i = width - 1; i >= 0; i--) {
		const space = " ".repeat(i);
		const tail = " ".repeat(width - i - 1);
		// Pake brontosaurus kalo balik arah biar lucu
		frames.push(`\x1b[38;5;46m[CALM] ${space}🦕${tail}\x1b[39m`);
	}

	const DINO_INDICATOR: WorkingIndicatorOptions = {
		frames: frames,
		intervalMs: 150,
	};

	const applyIndicator = (ctx: ExtensionContext) => {
		if (isCalm) {
			ctx.ui.setWorkingIndicator(DINO_INDICATOR);
			ctx.ui.setStatus("dino-calm", ctx.ui.theme.fg("dim", `Dino Calm: ON`));
		} else {
			ctx.ui.setWorkingIndicator(undefined); // Reset ke default
			ctx.ui.setStatus("dino-calm", undefined);
		}
	};

	pi.on("session_start", async (_event, ctx) => {
		applyIndicator(ctx);
	});

	pi.registerCommand("calm", {
		description: "Toggle Dino Calm mode (memunculkan dinosaurus saat AI sedang berpikir)",
		handler: async (args, ctx) => {
			isCalm = !isCalm;
			applyIndicator(ctx);
			ctx.ui.notify(
				isCalm 
					? "Rawrrr! Mode tenang dinosaurus diaktifkan. 🦖" 
					: "Mode dinosaurus dimatikan. Kembali ke indikator normal.",
				"info"
			);
		},
	});
}
