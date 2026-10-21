# Portrait prompts

The rotating portrait on the home and About pages is an idea borrowed from
[Sune Lehmann](https://sunelehmann.com). This is the recipe for this site's set.

## How to generate

1. Use a model that keeps a face from a reference photo well: **ChatGPT (image generation)**
   or **Gemini**. Upload the headshot once at the start of a chat and generate the whole set in
   that same chat, so the face stays consistent.
2. Send the **base prompt** first, then one **costume line** per message.
3. If a result drifts (different face, wrong crop), reply with
   *"Same person as the reference photo, keep the face exactly. Same framing as before."*
4. Download each result and name it after its file below (e.g. `viking.png`).
5. Put them all in one folder and run:

   ```bash
   npm run portraits ~/Downloads/portraits
   ```

   That crops each image to 4:5, resizes it to 800×1000 and saves it to `public/portraits/`.
   Each portrait shows up on the site as soon as its file exists; captions live in
   `src/site.config.ts`. Then delete the placeholder SVGs if you like.

## Base prompt

> Use the attached photo as the identity reference. Keep the person's face, hairstyle, short beard,
> blue eyes and big smile exactly as in the photo, so it is clearly the same person.
> Create a photorealistic head-and-shoulders studio portrait in a 4:5 portrait format: centered,
> slight three-quarter turn toward the camera like the reference, soft diffused studio light,
> plain seamless background in the colour given, 85mm lens look, shallow depth of field.
> No text, no logos, no frame. I will send one costume at a time.

## Costumes

| file | costume line | background |
| --- | --- | --- |
| `original` | Dark navy suit and light blue shirt, exactly as in the reference. | warm light grey |
| `radiologist` | White doctor's coat over scrubs, holding a chest X-ray up to the light and looking at the camera. | pale clinical blue |
| `athlete` | CrossFit athlete mid-workout: athletic tank top, chalk on the hands, a kettlebell on one shoulder, a little sweaty. | warm orange |
| `harpist` | Concert harpist in a black tuxedo, the top of a golden concert harp visible at one side. | deep burgundy |
| `astronaut` | White NASA-style spacesuit, helmet held under one arm. | dark navy |
| `alphorn` | Swiss alpine shirt with edelweiss embroidery, the bell of an alphorn resting on the shoulder. | soft alpine green |
| `tracht` | Austrian Tracht: checked shirt, embroidered suspenders and a green felt hat with a feather. | warm beige |
| `viking` | Viking: fur cloak, leather straps and a round wooden shield behind one shoulder (no horned helmet). | cold blue-grey |
| `beekeeper` | Beekeeper's hat with the veil pinned back, holding a honeycomb frame with a few bees. | honey yellow |
| `ski-instructor` | Red Swiss ski-school jacket, goggles pushed up on a helmet, a bit of snow on the shoulders. | icy light blue |
| `chef` | White double-breasted chef's jacket and a tall toque, a tea towel over one shoulder. | terracotta |
| `professor-1920` | 1920s professor: tweed three-piece suit, round wire glasses, chalk dust on the sleeves. | sepia parchment, slightly film-grainy |
| `hacker-1984` | 1984 computer hacker: shell-suit windbreaker, the green glow of a CRT monitor on the face. | dark teal |

Ideas for more: pilot, park ranger, mad scientist, opera singer, mountain guide, barista.
Add a line to `portraits` in `src/site.config.ts` for each new one.
