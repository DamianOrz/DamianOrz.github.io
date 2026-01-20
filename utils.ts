/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GenerateContentResponse } from "@google/genai";

export const generateId = () => 
    Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);

/**
 * Utility to extract JSON objects from a stream of text chunks.
 * Useful for when the model outputs multiple JSON objects consecutively.
 */
export async function* parseJsonStream(responseStream: AsyncIterable<GenerateContentResponse>) {
    let buffer = '';
    for await (const chunk of responseStream) {
        const text = chunk.text;
        if (typeof text !== 'string') continue;
        buffer += text;
        
        let braceCount = 0;
        let start = buffer.indexOf('{');
        
        while (start !== -1) {
            braceCount = 0;
            let end = -1;
            
            for (let i = start; i < buffer.length; i++) {
                if (buffer[i] === '{') braceCount++;
                else if (buffer[i] === '}') braceCount--;
                
                if (braceCount === 0 && i > start) {
                    end = i;
                    break;
                }
            }
            
            if (end !== -1) {
                const jsonString = buffer.substring(start, end + 1);
                try {
                    yield JSON.parse(jsonString);
                    buffer = buffer.substring(end + 1);
                    start = buffer.indexOf('{');
                } catch (e) {
                    // If parsing fails, try finding the next possible start
                    start = buffer.indexOf('{', start + 1);
                }
            } else {
                // Bracket not closed yet, wait for next chunk
                break;
            }
        }
    }
}
