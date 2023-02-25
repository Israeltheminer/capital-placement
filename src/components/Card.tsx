import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Props {
   children?: React.ReactNode;
   heading: string;
}

const BasicCard = React.forwardRef((props: Props, ref) => {
   return (
      <div className="shadow-md overflow-hidden rounded-2xl max-w-[526px]">
         <Card
            sx={{
               minWidth: '450px',
               boxShadow: 'none',
               minHeight: '300px',
               WebkitTapHighlightColor: 'none',
            }}
         >
            <div className="bg-[#D0F7FA] h-[78px] px-8 text-left flex items-center">
               <Typography
                  sx={{
                     fontWeight: '600',
                     fontSize: '21px',
                     marginTop: '6px',
                     letterSpacing: '0.3px',
                  }}
               >
                  {props.heading}
               </Typography>
            </div>
            <CardContent sx={{ paddingX: '34px', paddingY: '28px' }}>
               {props.children}
            </CardContent>
         </Card>
      </div>
   );
});

export default BasicCard;
