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
          // Blue boxes with white text
          primaryColor: '#1565C0',
          primaryTextColor: '#FFFFFF',
          primaryBorderColor: '#0D47A1',
          
          // Dark grey boxes with white text  
          secondaryColor: '#263238',
          secondaryTextColor: '#FFFFFF',
          secondaryBorderColor: '#37474F',
          
          // Green boxes with white text
          tertiaryColor: '#2E7D32',
          tertiaryTextColor: '#FFFFFF',
          tertiaryBorderColor: '#1B5E20',
          
          // Additional colors for contrast
          background: '#1A1A1A',
          mainBkg: '#263238',
          secondBkg: '#1565C0', 
          tertiaryBkg: '#2E7D32',
          
          // Text colors - all white for dark backgrounds
          nodeTextColor: '#FFFFFF',
          textColor: '#FFFFFF',
          labelTextColor: '#FFFFFF',
          
          // Lines and borders
          lineColor: '#90A4AE',
          edgeLabelBackground: '#263238',
          clusterBkg: '#37474F',
          clusterBorder: '#546E7A',
          
          // Ensure subgraph backgrounds are dark with white text
          cScale0: '#263238',
          cScale1: '#37474F', 
          cScale2: '#455A64',
          
          // Arrow and connector colors
          arrowheadColor: '#90A4AE',
          
          // Specific node styling
          fillType0: '#1565C0',
          fillType1: '#2E7D32',
          fillType2: '#FFB74D',
          fillType3: '#E57373',
          fillType4: '#9575CD',
        },
      });

      const renderChart = async () => {
        try {
          const { svg } = await mermaid.render('mermaid-chart-' + Date.now(), chart);
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