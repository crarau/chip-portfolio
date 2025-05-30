import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  className?: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart, className = '' }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#64B5F6',
          primaryTextColor: '#FFFFFF',
          primaryBorderColor: '#1565C0',
          lineColor: '#90A4AE',
          sectionBkgColor: '#424242',
          altSectionBkgColor: '#616161',
          gridColor: '#90A4AE',
          secondaryColor: '#81C784',
          tertiaryColor: '#FFD54F',
        },
      });

      const renderChart = async () => {
        try {
          const { svg } = await mermaid.render('mermaid-chart', chart);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `<pre class="text-red-500">Error rendering diagram: ${error}</pre>`;
          }
        }
      };

      renderChart();
    }
  }, [chart]);

  return (
    <div 
      ref={mermaidRef} 
      className={`mermaid-diagram my-6 ${className}`}
      style={{ textAlign: 'center' }}
    />
  );
};

export default Mermaid; 