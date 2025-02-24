'use client';

import { init } from '@instantdb/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import QRScanner from '@/components/ui/QRscanner';

const APP_ID = process.env.INSTANTDB_KEY || '';
const db = init({ appId: APP_ID });

export default function Page() {
  const query = { order: {}, customer: {} };
  const { isLoading, error, data } = db.useQuery(query);
  const [scanResult, setScanResult] = useState('');
  const [manualId, setManualId] = useState('');
  const [scanError, setScanError] = useState('');

  const handleCheckIn = async (orderId: string) => {
    setScanError('');
    if (!data || !data.order) {
      setScanError('Datos no cargados correctamente');
      return;
    }
    const orderExists = data.order.some((o: any) => o.id === orderId);
    if (!orderExists) {
      setScanError('ID de orden inválido');
      return;
    }
    try {
      await db.transact(
        db.tx.order[orderId].update({
          checkedIn: true,
          updatedAt: Date.now()
        })
      );
      setScanResult(orderId);
      setManualId('');
    } catch (error) {
      setScanError('Error al actualizar el check-in');
    }
  };

  if (isLoading) return <div className="p-4">Cargando...</div>;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-2xl font-semibold">Error</h2>
        <p className="text-muted-foreground">{error.message}</p>
        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    );
  }

  const { order, customer } = data;

  return (
    <div className="p-4 space-y-6">
      {/* Sección de check-in */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Lector QR */}
        <QRScanner
          onScanSuccess={(result) => handleCheckIn(result)}
          onScanError={(error) => setScanError(error)}
        />
        {/* Entrada manual */}
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Check-in Manual</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              placeholder="Ingresar ID de orden"
              className="flex-1 p-2 border rounded"
            />
            <Button onClick={() => handleCheckIn(manualId)} disabled={!manualId}>
              Validar
            </Button>
          </div>
        </div>
      </div>

      {/* Retroalimentación */}
      {scanResult && (
        <div className="p-4 bg-green-50 rounded-lg">
          ✓ Check-in exitoso para orden: {scanResult}
        </div>
      )}
      {scanError && (
        <div className="p-4 bg-red-50 rounded-lg text-red-600">
          ✗ {scanError}
        </div>
      )}
      {/* Tabla */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Usuario</th>
                <th className="p-3 text-center">Pago</th>
                <th className="p-3 text-center">Check-in</th>
              </tr>
            </thead>
            <tbody>
              {order.map((theOrder: any) => {
                const customerData = customer.find((c: any) => c.id === theOrder.customer_id);
                return (
                  <tr key={theOrder.id} className="border-t">
                    <td className="p-3 text-sm font-mono">{theOrder.id}</td>
                    <td className="p-3">
                      {new Date(theOrder.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-3">{customerData?.name || 'N/A'}</td>
                    <td className="p-3 text-center">{theOrder.paid ? 'SI' : 'NO'}</td>
                    <td className="p-3 text-center text-2xl">{theOrder.checkedIn ? '✅' : '❌'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}