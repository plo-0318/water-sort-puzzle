export const movesIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('fill', 'none');
  svgEl.setAttribute('stroke-width', '1.5');
  svgEl.classList.add('stat-icon');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute(
    'd',
    'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
  );

  svgEl.appendChild(path);

  return svgEl;
};

export const undosIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('fill', 'none');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('stroke-width', '1.5');
  svgEl.setAttribute('class', 'stat-icon');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('d', 'M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3');

  svgEl.appendChild(path);

  return svgEl;
};

export const hintsIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('fill', 'none');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('stroke-width', '1.5');
  svgEl.setAttribute('class', 'stat-icon');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute(
    'd',
    'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
  );

  svgEl.appendChild(path);

  return svgEl;
};

export const closeIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('stroke-width', '3.6');
  svgEl.setAttribute('class', 'close-icon');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('d', 'M6 18L18 6M6 6l12 12');

  svgEl.appendChild(path);

  return svgEl;
};

export const normalAnimationIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('stroke-width', '1.5');
  svgEl.setAttribute('class', 'setting-option-icon');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute(
    'd',
    'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
  );

  svgEl.appendChild(path);

  return svgEl;
};

export const fastAnimationIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('strokeWidth', '1.5');
  svgEl.setAttribute('class', 'setting-option-icon');
  svgEl.setAttribute('id', 'icon-animation-fast');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('strokeLinecap', 'round');
  path.setAttribute('strokeLinejoin', 'round');
  path.setAttribute(
    'd',
    'M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z'
  );

  svgEl.appendChild(path);

  return svgEl;
};

export const statesGeneratedIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('fill', 'none');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('stroke-width', '1.5');
  svgEl.setAttribute('class', 'stat-icon stat-icon__ai');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute(
    'd',
    'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9'
  );

  svgEl.appendChild(path);

  return svgEl;
};

export const statesSearchedIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('fill', 'none');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('stroke-width', '1.5');
  svgEl.setAttribute('class', 'stat-icon stat-icon__ai');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute(
    'd',
    'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
  );

  svgEl.appendChild(path);

  return svgEl;
};

export const pathIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('fill', 'none');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('stroke-width', '1.5');
  svgEl.setAttribute('class', 'stat-icon stat-icon__ai');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute(
    'd',
    'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z'
  );

  svgEl.appendChild(path);

  return svgEl;
};

export const timeIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('fill', 'none');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('stroke-width', '1.5');
  svgEl.setAttribute('class', 'stat-icon stat-icon__ai');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('d', 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z');

  svgEl.appendChild(path);

  return svgEl;
};

export const indicatorFromIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('fill', 'none');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.setAttribute('class', 'water-container-indicator');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('d', 'M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75');

  svgEl.appendChild(path);

  return svgEl;
};

export const indicatorToIcon = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgEl.setAttribute('fill', 'none');
  svgEl.setAttribute('viewBox', '0 0 24 24');
  svgEl.classList.add('water-container-indicator');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('d', 'M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75');

  svgEl.appendChild(path);

  return svgEl;
};
